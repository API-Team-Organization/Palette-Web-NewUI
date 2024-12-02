import './main.scss'
import {IoSettingsOutline} from "react-icons/io5";
import {IoIosSearch} from "react-icons/io";
import {HiMiniInbox} from "react-icons/hi2";
import {FaPlus} from "react-icons/fa";
import {MdMoreHoriz} from "react-icons/md";

export default function Home() {
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
              {/*여기 map 함수 들어갈 예정*/}
              <div className={`room`}>
                <h1>책 포스터</h1>
              </div>
            </div>
            <div className={`addRoom`}>
              <FaPlus size={20}/>
            </div>
          </div>
          <div className={`secondWrapper`}>
            <div className={`profileBox`}>
              <div className={`profileWrapper`}>
                <div className={`profileImage`}/>
                <h1>gk7734</h1>
              </div>
              <MdMoreHoriz size={30}/>
            </div>
          </div>
        </div>
        <div className={`palette-main-wrapper`}>
          <div className={`palette-top-panel`}>
            <h1>로그인을 하여 Pallete가 제공하는 홍보물을 만들어 보세요.</h1>
            <div className={`signBtn`}>Login to Palette</div>
          </div>
          <div className={`palette-mainBox`}></div>
        </div>
    </main>
  );
}
