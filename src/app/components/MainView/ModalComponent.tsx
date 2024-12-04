import StepperComponent from "@/app/components/Stepper/StepperComponent";
import Ratio from "@/app/components/Ratio";
import QuestionnaireSelectButton from "@/app/components/Button/QuestionnaireSelectButton";
import TitleDescriptionInput from "@/app/components/Input/TitleDescriptionInput";
import Position from "@/app/components/Position";
import {Circle} from "rc-progress";
import useRatioDirectionStore from "@/app/store/useRatioDirectionStore";
import useStepStore from "@/app/store/useStepStore";
import {useCallback, useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {useSearchParams} from "next/navigation";
import {io, Socket} from "socket.io-client";

export default function ModalComponent() {
    const paletteAxios = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        validateStatus: () => true,
    });

    const searchParams = useSearchParams();
    const roomId = searchParams.get('room');
    const [qna, setQna] = useState<any[]>();
    const { ratio, direction, setRatio } = useRatioDirectionStore();
    const { step, setStep } = useStepStore();
    const [Value, setValue] = useState<string>('');
    const [generating, setGenerating] = useState<boolean>(false);
    const [position, setPosition] = useState<number>(-1);
    const [max, setMax] = useState<number>(-1);
    const [genStep, setGenStep] = useState<number>(-1);
    const connectWebSocket = useCallback(() => {
        const socket: Socket = io(`${process.env.NEXT_PUBLIC_SOCKIO_HOST}/conversion`, {
            transports: ['websocket'],
        });

        socket.on('connect', () => {
            console.log('Socket connected');
            socket.emit('wstoio', {
                roomId: roomId,
                token: Cookies.get('access_token')
            });
        });

        socket.on('message', (message: any) => {
            if (message.type === 'NEW_CHAT') {
                setMessageList((prevState) => [...prevState, message]);
            } else if (message.type === 'IMAGE_PROGRESS') {
                setGenStep(message.value);
                setMax(message.max);
            } else if (message.type === 'GENERATE_STATUS') {
                setPosition(message.position);
                setGenerating(message.generating);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [roomId]);
    
    useEffect(() => {
        const connect = connectWebSocket();
        return () => {
            connect();
        };
    }, []);

    const getQna = async (id: string) => {
        try {
            await paletteAxios.get(`${process.env.NEXT_PUBLIC_API_URL}/room/${id}/qna`, {
                headers: {
                    'x-auth-token': Cookies.get('access_token')
                }
            }).then((res) => {
                if (res.status === 200) {
                    const qnas = res.data;
                    setQna(qnas.data);
                    setStep(qnas.data.filter((q: any) => q.answer !== null).length);
                    setRatio(qnas.data.find((it: any) => it.promptName === 'aspect_ratio').answer?.choiceId ?? 'DISPLAY');
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
    function mapToPercentage(value: number): number {
        value = Math.max(0, value);

        return value / max * 100; // bruh why this is complex
    }
    const regenImage = async () => {
        try {
            await paletteAxios.post(`${process.env.NEXT_PUBLIC_API_URL}/room/${roomId}/regen`, {}, {
                headers: { 'x-auth-token': Cookies.get('access_token') }
            })
        } catch (err) {
            console.log(err);
        }
    }
    
    const getChat = async (roomId: string) => {
        try {
            const res = await paletteAxios.get(`${process.env.NEXT_PUBLIC_API_URL}/chat/${roomId}`, {
                headers: { 'x-auth-token': Cookies.get('access_token') }
            })
            
            const dat = [...res.data.data];
            dat.reverse();
            setMessageList(dat);
        } catch (err) {
            console.log(err);
        }
    }
    
    useEffect(() => {
        if (roomId) {
            getQna(roomId);
            getChat(roomId);
        }
    }, [roomId])
    
    const [messageList, setMessageList] = useState<any[]>([]);
    const messageListProgress = messageList.filter((message) => message.value !== undefined);
    console.log(messageListProgress);
    
    return roomId ? (
        <div className={`palette-mainBox`}>
            <div style={{position: 'absolute', width: '100%', height: '100%'}}>
                <StepperComponent/>
            </div>
            {
                step < 2 ? (
                    <div style={{position: 'relative'}}>
                        <Ratio ratio={ratio} direction={direction}/>
                        <QuestionnaireSelectButton step={step}/>
                    </div>
                ) : null
            }
            {
                step === 2 ? (
                    <TitleDescriptionInput
                        type={'Description'}
                        content={messageList[5]?.message || ''}
                        value={Value}
                        setValue={setValue}
                    />
                ) : null
            }
            {
                step === 3 ? (
                    <TitleDescriptionInput
                        type={'Title'}
                        content={messageList[7]?.message || ''}
                        value={Value}
                        setValue={setValue}
                    />
                ) : null
            }
            {
                step === 4 ? (
                    <Position content={messageList[6]?.message || '포스터 제목의 위치는 어디에 두시겠습니까?'}/>
                ) : null
            }
            {
                step === 5 ? (
                    <div className={`complete`}>
                        {
                            generating ? (
                                <div className="circle-progress-wrapper">
                                    <Circle
                                        percent={mapToPercentage(genStep)}
                                        strokeWidth={5}
                                        strokeColor="#3E4AED"
                                        trailColor={'#D3D3D3'}
                                        className="progress"
                                    />
                                    <div className="progress-text">
                                        {`이미지 제작 중...`}
                                        {position > 0 ? ` (현재 대기열의 ${position}번째 순서입니다.)` : ''}
                                    </div>
                                </div>
                            ) : messageList.length > 0 && messageList[messageList.length - 1].resource === 'IMAGE' ? (
                                <div className={`finalBox`}>
                                    <img src={messageList[messageList.length - 1].message} alt={'image'}/>
                                    <div className={`regenBtn`} onClick={regenImage}>이미지 재생성</div>
                                </div>
                            ) : null
                        }
                    </div>
                ) : null
            }
        </div>
    ) : (
        <div>
            왼쪽 창에서 제작할 방을 선택 해 주세요.
        </div>
    );
}