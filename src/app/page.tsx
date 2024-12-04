'use client'

import './main.scss'
import {IoSettingsOutline} from "react-icons/io5";
import {IoIosSearch} from "react-icons/io";
import {HiMiniInbox} from "react-icons/hi2";
import {FaPlus} from "react-icons/fa";
import {MdMoreHoriz} from "react-icons/md";
import React, {Suspense, useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import useUserStore from "@/app/store/useUserStore";
import useRoomStore from "@/app/store/useRoomStore";
import ModalComponent from "@/app/components/MainView/ModalComponent";

export default function Home() {
  const paletteAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    validateStatus: () => true,
  });
  
  const { user, setUser } = useUserStore();
  const { roomList, setRoomList } = useRoomStore();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const getUserData = async () => {
    try {
      await paletteAxios.get(`${process.env.NEXT_PUBLIC_API_URL}/info/me`, {
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
      await paletteAxios.get(`${process.env.NEXT_PUBLIC_API_URL}/room/list`, {
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

  const addRoom = async () => {
    try {
      await paletteAxios.post(`${(process.env.NEXT_PUBLIC_API_URL)}/room`, {}, {
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

  useEffect(() => {
    const token = Cookies.get('access_token');
    setIsLoggedIn(!!token);
    getUserData();
    getRoomLists();
    const refreshTokenIntervalId = setInterval(async () => {
      try {
        await paletteAxios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/session`, {
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
      clearInterval(refreshTokenIntervalId);
    }
  }, []);
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
          <Suspense>
            <ModalComponent />
          </Suspense>
        </div>
      </main>
  );
}
