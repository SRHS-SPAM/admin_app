import { useState, useEffect } from "react";
import * as api from "./api";
import "./App.css";

import adminBg from "./assets/admin-bg.png";
import adminTopbar from "./assets/admin-topbar.png";
import adminSchoolLogo from "./assets/admin-school-logo.png";
import adminSpamLogo from "./assets/admin-spam-logo.png";

import adminLoginPanel from "./assets/admin-login-panel.png";
import adminEmailBox from "./assets/admin-email-box.png";
import adminPasswordBox from "./assets/admin-password-box.png";
import adminLoginButton from "./assets/admin-login-button.png";
import adminAutoCheck from "./assets/admin-auto-check.png";
import adminLoginLine from "./assets/admin-login-line.png";

import adminSignupPanel from "./assets/admin-signup-panel.png";
import adminYearBox from "./assets/admin-year-box.png";
import adminDropdownArrow from "./assets/admin-dropdown-arrow.png";
import adminSignupButton from "./assets/admin-signup-button.png";
import adminSignupCancelButton from "./assets/admin-signup-cancel-button.png";

import adminDropdownBox from "./assets/admin-dropdown-box.png";
import adminDropdownLine from "./assets/admin-dropdown-line.png";

import adminResendBox from "./assets/admin-resend-box.png";
import adminVerifyLine from "./assets/admin-verify-line.png";
import adminVerifyButton from "./assets/admin-verify-button.png";
import adminVerifyConfirmBox from "./assets/admin-verify-ConfirmBox.png";
import adminVerifySuccess from "./assets/admin-verify-success.png";
import adminVerifyCompleteButton from "./assets/admin-verify-complete-button.png";

import adminNewPasswordBox from "./assets/admin-new-password-box.png";
import adminChangePasswordButton from "./assets/admin-change-password-button.png";

import homeBanner from "./assets/admin-home-banner.png";
import printerPanel from "./assets/admin-printer-panel.png";
import printerGreen from "./assets/admin-printer-green.png";
import printerGray from "./assets/admin-printer-gray.png";
import printerRed from "./assets/admin-printer-red.png";
import printerYellow from "./assets/admin-printer-yellow.png";
import printerLabel from "./assets/admin-printer-label.png";
import footerBg from "./assets/admin-footer-bg.png";

import historyBanner from "./assets/admin-history-banner.png";
import historyTopLine from "./assets/admin-history-top-line.png";
import historyPanel from "./assets/admin-history-panel.png";
import historyMiddleLine from "./assets/admin-history-middle-line.png";
import historyOval from "./assets/admin-history-oval.png";

import printerSettingBanner from "./assets/admin-printer-setting-banner.png";
import settingIcon from "./assets/admin-setting-icon.png";
import printerAvailableButton from "./assets/admin-printer-available-button.png";

import settingSidePanel from "./assets/admin-setting-side-panel.png";
import settingTitleIcon from "./assets/admin-setting-title-icon.png";
import settingAccountLine from "./assets/admin-setting-account-line.png";
import settingMenuBox from "./assets/admin-setting-menu-box.png";
import settingArrowIcon from "./assets/admin-setting-arrow-icon.png";
import settingDateLine from "./assets/admin-setting-date-line.png";

import alarmLine from "./assets/admin-alarm-line.png";
import alarmBox from "./assets/admin-alarm-box.png";
import alarmToggle from "./assets/admin-alarm-toggle.png";
import alarmCircle from "./assets/admin-alarm-circle.png";
import alarmBlack from "./assets/admin-alarm-black.png";
import alarmGray from "./assets/admin-alarm-gray.png";
import passwordEyeOff from "./assets/admin-password-eye-off.png";
import passwordEyeOn from "./assets/admin-password-eye-on.png";

import withdrawBox from "./assets/admin-withdraw-box.png";
import withdrawTrash from "./assets/admin-withdraw-trash.png";
import withdrawConfirm from "./assets/admin-withdraw-confirm.png";
import withdrawCancel from "./assets/admin-withdraw-cancel.png";

function App() {
  // 관리자 웹은 무인증: 첫 화면 = 홈 (링크 자체를 교사에게만 공유)
  const [page, setPage] = useState("home");
  const [settingTab, setSettingTab] = useState("alarm");

  const [alarmOn, setAlarmOn] = useState(
    localStorage.getItem("alarmOn") === "true"
  );

  const now = new Date();
  const [selectedDate, setSelectedDate] = useState(now.getDate());
  const [printLogs, setPrintLogs] = useState([]);

  // 백엔드 프린터 목록 (status/current_user/reservation 포함)
  const [printers, setPrinters] = useState([]);

  useEffect(() => {
    if (page !== "home" && page !== "printerSetting") return;

    const load = async () => {
      try {
        setPrinters(await api.fetchPrinters());
      } catch (error) {
        console.error("프린터 상태 불러오기 실패:", error);
      }
    };

    load();

    const interval = setInterval(load, 3000);

    return () => clearInterval(interval);
  }, [page]);

  useEffect(() => {
    if (page !== "history") return;

    const load = async () => {
      try {
        setPrintLogs(await api.fetchPrintLogs());
      } catch (error) {
        console.error("프린터 기록 불러오기 실패:", error);
      }
    };

    load();

    const interval = setInterval(load, 5000);

    return () => clearInterval(interval);
  }, [page]);

  const getPrinterImage = (status) => {
    if (status === "available") return printerGreen;
    if (status === "using") return printerGray;
    if (status === "reserved") return printerYellow;
    if (status === "unavailable") return printerRed;
    return printerGreen;
  };

  const getPrinterText = (status) => {
    if (status === "available") return "비어있음";
    if (status === "using") return "사용중";
    if (status === "reserved") return "예약됨";
    if (status === "unavailable") return "사용불가";
    return "비어있음";
  };

  // 사각형 안 표시 정보: 사용자 / 예약자 (관리자는 한 화면에 둘 다)
  const getPrinterInfoLines = (printer, status) => {
    const lines = [];
    if (status === "using" && printer.current_user) {
      lines.push(`${printer.current_user.student_number} ${printer.current_user.name}`);
    }
    if (status === "reserved") {
      if (printer.current_user) {
        lines.push(`사용자 : ${printer.current_user.student_number} ${printer.current_user.name}`);
      }
      if (printer.reservation) {
        lines.push(`예약자 : ${printer.reservation.user.student_number} ${printer.reservation.user.name}`);
      }
    }
    return lines;
  };

  // 상태 설정 팝업: 사용 가능 / 사용 불가 / 예약 취소 (백엔드가 예약 취소 + 알림까지 처리)
  const [statusPopupPrinter, setStatusPopupPrinter] = useState(null);

  const handleStatusAction = async (action) => {
    const printer = statusPopupPrinter;
    if (!printer) return;
    try {
      let updated;
      if (action === "available") updated = await api.setAvailable(printer.id);
      else if (action === "unavailable") updated = await api.setUnavailable(printer.id);
      else updated = await api.cancelReservation(printer.id);
      setPrinters((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
      setStatusPopupPrinter(null);
    } catch (error) {
      alert(`프린터 상태 변경 실패: ${error.message}`);
    }
  };

  const handleAlarmToggle = () => {
    const nextAlarmState = !alarmOn;

    setAlarmOn(nextAlarmState);
    localStorage.setItem("alarmOn", String(nextAlarmState));

    if (nextAlarmState) {
      console.log("알림 켜짐");
    } else {
      console.log("알림 꺼짐");
    }
  };

  return (
    <div className="admin-page">
      <header className="topbar">
        <img src={adminTopbar} className="topbar-img" alt="" />

        <nav className="top-nav">
          <span onClick={() => setPage("home")}>홈</span>
          <span onClick={() => setPage("history")}>기록</span>
          <span onClick={() => setPage("printerSetting")}>프린터 설정</span>
        </nav>

        <div className="logo-area">
          <img src={adminSchoolLogo} className="school-logo" alt="" />
          <img src={adminSpamLogo} className="spam-logo" alt="" />
        </div>
      </header>

      {page === "home" && (
        <main className="home-wrap">
          <img src={homeBanner} className="home-banner" alt="" />
          <div className="home-banner-text">
            <p>우리 학교 3D 프린터를</p>
            <p>한 곳에서.</p>
          </div>

          <section className="home-content">
            <h1 className="home-title">프린터 상태 확인</h1>

            <div className="home-printer-panel">
              <img src={printerPanel} className="home-panel-img" alt="" />
              <h2 className="home-panel-title">2층 소프트웨어 3D프린터</h2>

              <div className="home-printer-grid">
                {printers.map((printer) => {
                  const status = api.statusForAdmin(printer);
                  return (
                    <PrinterCard
                      key={printer.id}
                      img={getPrinterImage(status)}
                      label={printerLabel}
                      name={printer.name}
                      status={getPrinterText(status)}
                      infoLines={getPrinterInfoLines(printer, status)}
                    />
                  );
                })}
              </div>
            </div>
          </section>

          <Footer />
        </main>
      )}

      {page === "history" && (
        <main className="history-wrap">
          <img src={historyBanner} className="history-banner" alt="" />

          <div className="history-banner-text">
            <p className="history-banner-line1">모든 프린터 사용 기록은</p>
            <p className="history-banner-line2">이 곳에서 확인할 수 있습니다.</p>
          </div>

          <section className="history-content">
            <img src={historyTopLine} className="history-top-line" alt="" />

            <h1 className="history-title">기록</h1>

            <div className="history-box">
              <img src={historyPanel} className="history-panel-img" alt="" />

              <h2 className="history-month">
                {now.getFullYear()}년 {now.getMonth() + 1}월
              </h2>

              <h2 className="history-printer-title">
                2층 소프트웨어 3D프린터
              </h2>

              <div className="history-days">
                {Array.from({ length: 7 }, (_, i) => {
                  const date = new Date(now);
                  date.setDate(now.getDate() - now.getDay() + i);

                  return (
                    <div
                      key={i}
                      className="history-day"
                      onClick={() => setSelectedDate(date.getDate())}
                    >
                      {selectedDate === date.getDate() && (
                        <img
                          src={historyOval}
                          className="history-day-oval"
                          alt=""
                        />
                      )}

                      <span>
                        {date.getDate()}일(
                        {["일", "월", "화", "수", "목", "금", "토"][date.getDay()]}
                        )
                      </span>
                    </div>
                  );
                })}
              </div>

              <img
                src={historyMiddleLine}
                className="history-middle-line"
                alt=""
              />

              <div className="history-table">
                <div>프린터 번호</div>
                <div>사용자</div>
                <div>시작 시간</div>
                <div>종료 시간</div>
                <div>상태</div>

                {(() => {
                  // 선택한 날짜의 기록만 표시 (최근 7일 데이터)
                  const dayLogs = printLogs.filter(
                    (log) =>
                      new Date(log.started_at).getDate() === selectedDate
                  );
                  return dayLogs.length === 0 ? (
                    <div className="history-empty">해당 날짜의 기록이 없습니다.</div>
                  ) : (
                    dayLogs.map((log) => <PrintLogRow key={log.id} log={log} />)
                  );
                })()}
              </div>
            </div>
          </section>

          <Footer />
        </main>
      )}

      {page === "printerSetting" && (
        <main className="printer-setting-wrap">
          <img
            src={printerSettingBanner}
            className="printer-setting-banner"
            alt=""
          />

          <div className="printer-setting-banner-text">
            <p>모든 프린터를 자유롭게 설정할 수 있습니다.</p>
          </div>

          <img
            src={settingIcon}
            className="printer-setting-icon"
            alt=""
            onClick={() => setPage("setting")}
          />

          <section className="printer-setting-content">
            <h1 className="printer-setting-title">프린터 상태 설정</h1>

            <div className="printer-setting-panel">
              <img
                src={printerPanel}
                className="printer-setting-panel-img"
                alt=""
              />

              <h2 className="printer-setting-panel-title">
                2층 소프트웨어 3D프린터
              </h2>

              <div className="printer-setting-grid">
                {printers.map((printer) => {
                  const status = api.statusForAdmin(printer);
                  return (
                    <PrinterCard
                      key={printer.id}
                      img={getPrinterImage(status)}
                      label={printerLabel}
                      name={printer.name}
                      status={getPrinterText(status)}
                      infoLines={getPrinterInfoLines(printer, status)}
                      buttonImg={printerAvailableButton}
                      buttonText="상태 설정"
                      onButtonClick={() => setStatusPopupPrinter(printer)}
                    />
                  );
                })}
              </div>
            </div>
          </section>

          <Footer />
        </main>
      )}

      {page === "setting" && (
        <main className="setting-wrap">
          <aside className="setting-sidebar">
            <img src={settingSidePanel} className="setting-side-panel" alt="" />

            <div className="setting-side-title">
              <img src={settingTitleIcon} alt="" />
              <span>설정</span>
            </div>

            <div className="setting-side-menu-list">
              <button
                className="setting-side-menu"
                onClick={() => setSettingTab("alarm")}
              >
                알림
              </button>
            </div>
          </aside>

          <section className="setting-main">
            {settingTab === "alarm" && (
              <>
                <h1 className="setting-main-title">알림</h1>
                <img src={alarmLine} className="alarm-line" alt="" />

                <h2 className="alarm-title">알림 키기/끄기</h2>

                <div className="alarm-box">
                  <img src={alarmBox} className="alarm-box-img" alt="" />
                  <span className="alarm-box-text">알림 키기/끄기</span>

                  <img
                    src={alarmOn ? alarmBlack : alarmToggle}
                    className="alarm-toggle-img"
                    alt=""
                    onClick={handleAlarmToggle}
                  />

                  <img
                    src={alarmOn ? alarmGray : alarmCircle}
                    className={
                      alarmOn ? "alarm-circle-img on" : "alarm-circle-img"
                    }
                    alt=""
                    onClick={handleAlarmToggle}
                  />
                </div>
              </>
            )}

          </section>
        </main>
      )}

      {/* 프린터 상태 설정 팝업: 사용 가능 / 사용 불가 / 예약 취소 */}
      {statusPopupPrinter && (
        <div
          className="status-popup-bg"
          onClick={() => setStatusPopupPrinter(null)}
        >
          <div className="status-popup" onClick={(e) => e.stopPropagation()}>
            <div className="status-popup-title">
              {statusPopupPrinter.name} 상태 설정
            </div>

            <button
              className="status-popup-option"
              onClick={() => handleStatusAction("available")}
            >
              사용 가능
            </button>
            <button
              className="status-popup-option danger"
              onClick={() => handleStatusAction("unavailable")}
            >
              사용 불가
            </button>
            <button
              className="status-popup-option"
              onClick={() => handleStatusAction("cancel")}
            >
              예약 취소
            </button>

            <button
              className="status-popup-close"
              onClick={() => setStatusPopupPrinter(null)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// "17:00" 형태 표시
const fmtTime = (iso) => {
  if (!iso) return "-";
  const d = new Date(iso);
  const p = (n) => String(n).padStart(2, "0");
  return `${p(d.getHours())}:${p(d.getMinutes())}`;
};

function PrintLogRow({ log }) {
  const done = !!log.ended_at;
  return (
    <>
      <div>{log.printer_name}</div>
      <div>{log.user ? log.user.display_name : "-"}</div>
      <div>{fmtTime(log.started_at)}</div>
      <div>{done ? fmtTime(log.ended_at) : "-"}</div>
      <div className={done ? "history-status-normal" : "history-status-error"}>
        {done ? "정상" : "사용중"}
      </div>
    </>
  );
}

function PrinterCard({
  img,
  label,
  status,
  name,
  infoLines,
  buttonImg,
  buttonText,
  onButtonClick,
}) {
  return (
    <div className="home-printer-card">
      <div className="home-printer-box">
        <img src={img} alt="" />
        {/* 상태 글씨 아래 사용자/예약자 학번·이름 */}
        {infoLines && infoLines.length > 0 && (
          <div className="printer-box-info">
            {infoLines.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        )}
      </div>

      <div className="home-printer-name">
        <img src={label} alt="" />
        <span>{name}</span>
      </div>

      {buttonImg && (
        <button
          type="button"
          className="printer-state-button-wrap"
          onClick={onButtonClick}
        >
          <img src={buttonImg} className="printer-state-button" alt="" />
          <span className="printer-state-text">{buttonText}</span>
        </button>
      )}
    </div>
  );
}

function SettingMenuBox({ text, icon, onClick, type }) {
  return (
    <div className="setting-menu-box" onClick={onClick}>
      <img src={settingMenuBox} alt="" />
      <span>{text}</span>
      <img
        src={icon}
        className={
          type === "login" ? "setting-menu-arrow-login" : "setting-menu-arrow"
        }
        alt=""
      />
    </div>
  );
}

function PasswordChangeBox({
  label,
  value,
  onChange,
  readOnly,
  showPassword,
  togglePassword,
}) {
  return (
    <div className="email-change-box">
      <img src={settingMenuBox} className="email-change-box-img" alt="" />

      <span className="email-change-label">{label}</span>

      <img src={settingDateLine} className="email-change-line" alt="" />

      <input
        className="password-change-input"
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />

      <img
        src={showPassword ? passwordEyeOn : passwordEyeOff}
        className="password-eye-icon"
        alt=""
        onClick={togglePassword}
      />
    </div>
  );
}

function SignupInput({ img, placeholder }) {
  return (
    <div className="signup-input-box">
      <img src={img} alt="" />
      <input placeholder={placeholder} />
    </div>
  );
}

function Footer() {
  return (
    <footer className="home-footer">
      <img src={footerBg} className="home-footer-img" alt="" />

      <p>서울로봇고등학교 3D 프린터 관리 시스템</p>
      <p>SPAM동아리에서 제작</p>

      <div className="home-footer-row">
        <span>Frontend : React</span>
        <span>Backend : DRF</span>
        <span>Design : Figma</span>
      </div>
    </footer>
  );
}

export default App;