'use client'

import './main.scss'
import {IoSettingsOutline} from "react-icons/io5";
import {IoIosSearch} from "react-icons/io";
import {HiMiniInbox} from "react-icons/hi2";
import {FaPlus} from "react-icons/fa";
import {MdMoreHoriz} from "react-icons/md";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import useUserStore from "@/app/store/useUserStore";
import useRoomStore from "@/app/store/useRoomStore";
import StepperComponent from "@/app/components/Stepper/StepperComponent";
import Ratio, {RatioType} from "@/app/components/Ratio";
import QuestionnaireSelectButton from "@/app/components/Button/QuestionnaireSelectButton";
import useRatioDirectionStore from "@/app/store/useRatioDirectionStore";
import useStepStore from "@/app/store/useStepStore";
import {useSearchParams} from "next/navigation";
import {io, Socket} from "socket.io-client";
import TitleDescriptionInput from "@/app/components/Input/TitleDescriptionInput";
import Position from "@/app/components/Position";
import {Circle} from "rc-progress";
import Image from "next/image";

interface MessageItem {
  regenScope: boolean;
  message: string;
  resource: any;
  type: string;
  value: number;
  max: number;
  position: number;
}

export default function Home() {
  const { user, setUser } = useUserStore();
  const { roomList, setRoomList } = useRoomStore();
  const { ratio, direction } = useRatioDirectionStore();
  const { step, setStep } = useStepStore();
  const [qna, setQna] = useState<any[]>();
  const [messageList, setMessageList] = useState<MessageItem[]>([]);
  const [Value, setValue] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const roomId = searchParams.get('room');

  const getUserData = async () => {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/info/me`, {
        headers: { 'x-auth-token': Cookies.get('access_token') }
      })
          .then((res) => {
            if (res.status === 200) {
              setUser(res.data.data);
            }
          })
    } catch (err) {
      console.log(err)
    }
  }

  const getRoomLists = async () => {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/room/list`, {
        headers: {
          'x-auth-token': Cookies.get('access_token')
        }
      }).then((res) => {
        if (res.status === 200) {
          setRoomList(res.data.data.reverse());
        }

        if (res.status === 401) {
          alert('세션이 만료되었습니다.');
          Cookies.remove('access_token');
          window.location.href = '/auth/login';
        }
      })
    } catch (err) {
      console.error('방 목록을 가져오는 중 오류 발생:', err);
    }
  };

  const connectWebSocket = useCallback(() => {
    const socket: Socket = io(`localhost:3336/conversion`, {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Socket connected');
      socket.emit('wstoio', {
        roomId: roomId,
        token: Cookies.get('access_token')
      });
    });

    socket.on('message', (message: MessageItem) => {
      setMessageList((prevState) => [...prevState, {
        message: message.message,
        resource: message.resource,
        type: message.type,
        position: message.position,
        regenScope: message.regenScope,
        value: message.value,
        max: message.max,
      }])
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const getQna = async (id: string) => {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/room/${id}/qna`, {
        headers: {
          'x-auth-token': Cookies.get('access_token')
        }
      }).then((res) => {
        if (res.status === 200) {
          setQna(res.data.data);
          setStep(res.data.data.filter((q: any) => q.answer !== null).length);
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const addRoom = async () => {
    try {
      await axios.post(`${(process.env.NEXT_PUBLIC_API_URL)}/room`, {}, {
        headers: {
          'x-auth-token': Cookies.get('access_token')
        }
      })
          .then((res) => {
            if (res.status === 200) {
              window.location.href = '/?room=' + res.data.data.id;
            }
          })
    } catch (err) {
      console.error('방을 추가하는 중 오류 발생:', err);
    }
  }

  function mapToPercentage(value: number): number {
    const minValue = 1;
    const maxValue = 6;
    const targetMin = 0;
    const targetMax = 100;

    if (value < minValue || value > maxValue) {
      throw new Error(`Value must be between ${minValue} and ${maxValue}.`);
    }

    return ((value - minValue) / (maxValue - minValue)) * (targetMax - targetMin) + targetMin;
  }

  const regenImage = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/room/${roomId}/regen`, {}, {
        headers: { 'x-auth-token': Cookies.get('access_token') }
      })
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (roomId) {
      getQna(roomId);
    }
  }, [roomId])

  useEffect(() => {
    const token = Cookies.get('access_token');
    setIsLoggedIn(!!token);
    getUserData();
    getRoomLists();
    const socketCleanup = connectWebSocket();
    const refreshTokenIntervalId = setInterval(async () => {
      try {
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/session`, {
          headers: {
            'x-auth-token': Cookies.get('access_token'),
          },
        });
      } catch (err) {
        alert('세션이 만료되었습니다.');
        Cookies.remove('access_token');
        window.location.href = '/auth/login';
      }
    }, 180000);

    return () => {
      socketCleanup;
      clearInterval(refreshTokenIntervalId);
    }
  }, []);
  const messageListProgress = messageList.filter((message) => message.value !== undefined);
  console.log(messageListProgress[messageListProgress.length - 1]);
  return (
      <main className={`palette-container`}>
        <div className={`palette-panel`}>
          <div className={`logo`}/>
          <div className={`featureWrapper`}>
            <div className={`searchBox`}>
              <IoIosSearch size={28}/>
            </div>
            <div className={`inboxBox`}>
              <HiMiniInbox size={25}/>
            </div>
          </div>
          <div className={`settingBox`}>
            <IoSettingsOutline size={25}/>
          </div>
        </div>
        <div className={`palette-room-panel`}>
          <div className={`firstWrapper`}>
            <div className={`ai-image`}>
              <h1>홍보물 제작</h1>
            </div>
            <div className={`roomBox`}>
              {roomList?.map((room, index) => {
                return (
                    <div
                        className={`room`}
                        onClick={() => window.location.href = '/?room=' + room.id}
                        key={index}
                    >
                      <h1>{room.title}</h1>
                    </div>
                )
              })}
            </div>
            <div className={`addRoom`} onClick={addRoom}>
              <FaPlus size={20}/>
            </div>
          </div>
          <div className={`secondWrapper`}>
            <div className={`profileBox`}>
              <div className={`profileWrapper`}>
                <div className={`profileImage`}/>
                <h1>{user ? user.name : '로딩중'}</h1>
              </div>
              <MdMoreHoriz size={30}/>
            </div>
          </div>
        </div>
        <div className={`palette-main-wrapper`}>
          <div className={`palette-top-panel`} style={{display: isLoggedIn ? 'none' : 'flex'}}>
            <h1>로그인을 하여 Pallete가 제공하는 홍보물을 만들어 보세요.</h1>
            <div className={`signBtn`}>Login to Palette</div>
          </div>
          <div className={`palette-mainBox`}>
            <div style={{position: 'absolute', width: '100%', height: '100%'}}>
              <StepperComponent />
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
                      messageListProgress.length > 0 && messageListProgress[messageListProgress.length - 1].value !== 6 ? (
                          <div className="circle-progress-wrapper">
                            <Circle
                                percent={mapToPercentage(Number(messageListProgress.length > 0 ? messageListProgress[messageListProgress.length - 1].value : 1))}
                                strokeWidth={5}
                                strokeColor="#3E4AED"
                                trailColor={'#D3D3D3'}
                                className="progress"
                            />
                            <div className="progress-text">
                              {`이미지 제작 중...`}
                            </div>
                          </div>
                      ) : null
                    }
                    {
                      messageListProgress[messageListProgress.length - 1]?.value === 6 && messageList[messageList.length-1].resource === 'IMAGE' ? (
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
        </div>
      </main>
  );
}
