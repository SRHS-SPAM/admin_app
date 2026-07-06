import { useState, useEffect } from "react";
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
  const [page, setPage] = useState("login");
  const [isLogin, setIsLogin] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const [settingTab, setSettingTab] = useState("account");

  const [alarmOn, setAlarmOn] = useState(
    localStorage.getItem("alarmOn") === "true"
  );

  const [joinDate, setJoinDate] = useState(
    localStorage.getItem("joinDate") || "가입일 없음"
  );

  const [newEmail, setNewEmail] = useState("");

  const [loginEmail, setLoginEmail] = useState(
    localStorage.getItem("loginEmail") || ""
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [monthOpen, setMonthOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");

  const [dayOpen, setDayOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");

  const [timeLeft, setTimeLeft] = useState(600);
  const [isVerified, setIsVerified] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");

  const now = new Date();
  const [selectedDate, setSelectedDate] = useState(now.getDate());
  const [printLogs, setPrintLogs] = useState([]);

  const [printers, setPrinters] = useState([
    { id: 1, name: "프린터A", status: "available" },
    { id: 2, name: "프린터B", status: "available" },
    { id: 3, name: "프린터C", status: "available" },
    { id: 4, name: "프린터D", status: "available" },
  ]);

  const [correctCode] = useState("654321");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  useEffect(() => {
    const protectedPages = ["home", "history", "printerSetting", "setting"];

    if (!isLogin && protectedPages.includes(page)) {
      alert("로그인 후 이용해주세요.");
      setPage("login");
    }
  }, [page, isLogin]);

  useEffect(() => {
    if (page !== "home" && page !== "printerSetting") return;

    const fetchPrinters = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/printers/");
        const data = await res.json();
        setPrinters(data);
      } catch (error) {
        console.error("프린터 상태 불러오기 실패:", error);
      }
    };

    fetchPrinters();

    const interval = setInterval(fetchPrinters, 3000);

    return () => clearInterval(interval);
  }, [page]);

  useEffect(() => {
    if (page !== "history") return;

    const fetchPrintLogs = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/printer-logs/");
        const data = await res.json();
        setPrintLogs(data);
      } catch (error) {
        console.error("프린터 기록 불러오기 실패:", error);
      }
    };

    fetchPrintLogs();

    const interval = setInterval(fetchPrintLogs, 5000);

    return () => clearInterval(interval);
  }, [page]);

  useEffect(() => {
    if (page !== "findPasswordVerify") return;

    setTimeLeft(600);
    setIsVerified(false);
    setVerifyCode("");

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
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

  const getPrinterButtonText = () => {
  return "상태설정";
  };

  const handleDisablePrinter = async (printerId) => {
    const targetPrinter = printers.find((printer) => printer.id === printerId);

    if (!targetPrinter) return;

    const nextStatus =
      targetPrinter.status === "available" ? "unavailable" : "available";

    setPrinters((prev) =>
      prev.map((printer) =>
        printer.id === printerId
          ? { ...printer, status: nextStatus }
          : printer
      )
    );

    try {
      await fetch(`http://localhost:8000/api/printers/${printerId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: nextStatus,
        }),
      });
    } catch (error) {
      console.error("프린터 상태 변경 실패:", error);
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

  const handleLogin = () => {
    if (email.trim() === "" || password.trim() === "") {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    // 임시 로그인
    setLoginEmail(email.trim());
    localStorage.setItem("loginEmail", email.trim());

    setIsLogin(true);
    setPage("home");
  };

  const goProtectedPage = (targetPage) => {
    if (!isLogin) {
      alert("로그인 후 이용해주세요.");
      setPage("login");
      return;
    }

    setPage(targetPage);
  };

  const handleLogout = () => {
    setIsLogin(false);
    setPage("login");
  };

  const handleVerifyCode = () => {
    if (verifyCode.trim() === "") {
      alert("인증코드를 입력해주세요.");
      return;
    }

    if (verifyCode.trim() !== correctCode) {
      alert("인증코드가 올바르지 않습니다.");
      return;
    }

    setIsVerified(true);
  };

  const handleChangePassword = () => {
    if (newPassword.trim() === "" || newPasswordCheck.trim() === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (newPassword !== newPasswordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    setNewPassword("");
    setNewPasswordCheck("");
    setPage("login");
  };

  const isLoginPage =
    page === "login" ||
    page === "signup" ||
    page === "findPassword" ||
    page === "findPasswordVerify" ||
    page === "changePassword";

  const isLoggedInPage =
    page === "home" ||
    page === "history" ||
    page === "printerSetting" ||
    page === "setting";

  return (
    <div className="admin-page">
      {isLoginPage && <img src={adminBg} className="admin-bg" alt="" />}

      <header className="topbar">
        <img src={adminTopbar} className="topbar-img" alt="" />

        <nav className="top-nav">
          <span onClick={() => goProtectedPage("home")}>홈</span>
          <span onClick={() => goProtectedPage("history")}>기록</span>
          <span onClick={() => goProtectedPage("printerSetting")}>프린터 설정</span>
        </nav>

        <div className="logo-area">
          <img src={adminSchoolLogo} className="school-logo" alt="" />
          <img src={adminSpamLogo} className="spam-logo" alt="" />
        </div>

        <span
          className="login-nav"
          onClick={isLogin ? handleLogout : () => setPage("login")}
        >
          {isLogin ? "로그아웃" : "로그인"}
        </span>
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
                {printers.map((printer) => (
                  <PrinterCard
                    key={printer.id}
                    img={getPrinterImage(printer.status)}
                    label={printerLabel}
                    name={printer.name}
                    status={getPrinterText(printer.status)}
                  />
                ))}
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

                {printLogs.length === 0 ? (
                  <div className="history-empty">기록을 불러오는 중입니다.</div>
                ) : (
                  printLogs.map((log) => (
                    <PrintLogRow key={log.id} log={log} />
                  ))
                )}
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
                {printers.map((printer) => (
                  <PrinterCard
                    key={printer.id}
                    img={getPrinterImage(printer.status)}
                    label={printerLabel}
                    name={printer.name}
                    status={getPrinterText(printer.status)}
                    buttonImg={printerAvailableButton}
                    buttonText={getPrinterButtonText(printer.status)}
                    onButtonClick={() => handleDisablePrinter(printer.id)}
                  />
                ))}
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
                onClick={() => setSettingTab("account")}
              >
                계정
              </button>

              <button
                className="setting-side-menu"
                onClick={() => setSettingTab("alarm")}
              >
                알림
              </button>
            </div>
          </aside>

          <section className="setting-main">
            {settingTab === "account" && (
              <>
                <h1 className="setting-main-title">계정</h1>
                <img
                  src={settingAccountLine}
                  className="setting-account-line"
                  alt=""
                />

                <h2 className="setting-section-title">로그인 정보</h2>

                <SettingMenuBox
                  text="이메일 변경/확인"
                  icon={settingArrowIcon}
                  type="login"
                  onClick={() => setSettingTab("email")}
                />

                <SettingMenuBox
                  text="비밀번호 변경"
                  icon={settingArrowIcon}
                  type="login"
                  onClick={() => setSettingTab("password")}
                />

                <h2 className="setting-section-title">계정 정보</h2>

                <div className="setting-info-box">
                  <img src={settingMenuBox} alt="" />
                  <span className="setting-info-label">가입일</span>
                  <img
                    src={settingDateLine}
                    className="setting-date-line"
                    alt=""
                  />
                  <span className="setting-info-blue">{joinDate}</span>
                </div>

                <div className="setting-info-box">
                  <img src={settingMenuBox} alt="" />
                  <span className="setting-info-label">가입 방법</span>
                  <img
                    src={settingDateLine}
                    className="setting-date-line"
                    alt=""
                  />
                  <span className="setting-info-value">이메일</span>
                </div>

                <h2 className="setting-section-title">로그아웃/회원 탈퇴</h2>

                <SettingMenuBox
                  text="로그아웃"
                  icon={settingArrowIcon}
                  onClick={handleLogout}
                />

                <SettingMenuBox
                  text="회원 탈퇴"
                  icon={settingArrowIcon}
                  onClick={() => setShowWithdrawModal(true)}
                />
              </>
            )}

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

            {settingTab === "email" && (
              <>
                <h1 className="setting-main-title">로그인 정보</h1>
                <img
                  src={settingAccountLine}
                  className="setting-account-line"
                  alt=""
                />

                <h2 className="email-change-title">이메일 변경/확인</h2>

                <div className="email-change-box">
                  <img
                    src={settingMenuBox}
                    className="email-change-box-img"
                    alt=""
                  />
                  <span className="email-change-label">기존 이메일</span>
                  <img
                    src={settingDateLine}
                    className="email-change-line"
                    alt=""
                  />
                  <input
                    className="email-change-input"
                    value={loginEmail}
                    readOnly
                  />
                </div>

                <div className="email-change-box">
                  <img
                    src={settingMenuBox}
                    className="email-change-box-img"
                    alt=""
                  />
                  <span className="email-change-label">새 이메일</span>
                  <img
                    src={settingDateLine}
                    className="email-change-line"
                    alt=""
                  />
                  <input
                    className="email-change-input"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>
              </>
            )}

            {settingTab === "password" && (
              <>
                <h1 className="setting-main-title">로그인 정보</h1>
                <img
                  src={settingAccountLine}
                  className="setting-account-line"
                  alt=""
                />

                <h2 className="email-change-title">비밀번호 변경</h2>

                <PasswordChangeBox
                  label="기존 비밀번호"
                  value={password}
                  readOnly
                  showPassword={showCurrentPassword}
                  togglePassword={() =>
                    setShowCurrentPassword(!showCurrentPassword)
                  }
                />

                <PasswordChangeBox
                  label="새 비밀번호"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  showPassword={showNewPassword}
                  togglePassword={() => setShowNewPassword(!showNewPassword)}
                />

                <PasswordChangeBox
                  label="비밀번호 확인"
                  value={newPasswordCheck}
                  onChange={(e) => setNewPasswordCheck(e.target.value)}
                  showPassword={showConfirmPassword}
                  togglePassword={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                />
              </>
            )}
          </section>
        </main>
      )}

      {page === "login" && (
        <main className="login-wrap">
          <div className="login-box">
            <img src={adminLoginPanel} className="login-panel" alt="" />

            <div className="login-content">
              <h1>로그인</h1>

              <label>이메일</label>
              <div className="input-box">
                <img src={adminEmailBox} alt="" />
                <input
                  type="email"
                  placeholder="이메일 입력"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <label>비밀번호</label>
              <div className="input-box">
                <img src={adminPasswordBox} alt="" />
                <input
                  type="password"
                  placeholder="비밀번호 입력"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="login-button" onClick={handleLogin}>
                <img src={adminLoginButton} alt="" />
                <span>로그인</span>
              </button>

              <div
                className="auto-login"
                onClick={() => setAutoLogin(!autoLogin)}
              >
                <div className="check-box">
                  <img src={adminAutoCheck} alt="" />
                  {autoLogin && <span className="check-mark">✓</span>}
                </div>
                <span>자동 로그인</span>
              </div>

              <img src={adminLoginLine} className="login-line" alt="" />

              <div className="login-links">
                <span onClick={() => setPage("signup")}>회원 가입</span>
                <span onClick={() => setPage("findPassword")}>
                  비밀번호 찾기
                </span>
              </div>
            </div>
          </div>
        </main>
      )}

      {page === "signup" && (
        <main className="signup-wrap">
          <div className="signup-box">
            <img src={adminSignupPanel} className="signup-panel" alt="" />

            <div className="signup-content">
              <h1>회원가입</h1>

              <label>이메일</label>
              <SignupInput img={adminEmailBox} placeholder="이메일 입력" />

              <label>비밀번호</label>
              <SignupInput img={adminPasswordBox} placeholder="비밀번호 입력" />
              <p>*10자 이상이면서 영문, 숫자, 특수문자를 모두 포함하세요</p>

              <label>비밀번호 확인</label>
              <SignupInput img={adminPasswordBox} placeholder="비밀번호 입력" />
              <p>* 비밀번호를 다시 입력해주세요</p>

              <label>이름</label>
              <SignupInput img={adminEmailBox} placeholder="이름 입력" />

              <label>전화 번호</label>
              <SignupInput
                img={adminEmailBox}
                placeholder="휴대폰 번호 입력('-' 제외 11자리 입력)"
              />

              <label>생년월일</label>
              <div className="birth-row">
                <div className="birth-box">
                  <img src={adminYearBox} alt="" />
                  <input placeholder="년도" />
                </div>

                <div
                  className="birth-box month-box"
                  onClick={() => {
                    setMonthOpen(!monthOpen);
                    setDayOpen(false);
                  }}
                >
                  <img src={adminYearBox} alt="" />
                  <input value={selectedMonth} placeholder="월" readOnly />
                  <img
                    src={adminDropdownArrow}
                    className="dropdown-arrow"
                    alt=""
                  />

                  {monthOpen && (
                    <div className="month-dropdown">
                      <img
                        src={adminDropdownBox}
                        className="dropdown-bg"
                        alt=""
                      />

                      <div className="dropdown-content">
                        <span className="dropdown-title">월</span>
                        <img
                          src={adminDropdownLine}
                          className="dropdown-line"
                          alt=""
                        />

                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (month) => (
                            <div
                              key={month}
                              className="dropdown-option"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMonth(`${month}월`);
                                setMonthOpen(false);
                              }}
                            >
                              {month}월
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className="birth-box day-box"
                  onClick={() => {
                    setDayOpen(!dayOpen);
                    setMonthOpen(false);
                  }}
                >
                  <img src={adminYearBox} alt="" />
                  <input value={selectedDay} placeholder="일" readOnly />
                  <img
                    src={adminDropdownArrow}
                    className="dropdown-arrow"
                    alt=""
                  />

                  {dayOpen && (
                    <div className="day-dropdown">
                      <img
                        src={adminDropdownBox}
                        className="dropdown-bg"
                        alt=""
                      />

                      <div className="dropdown-content day-dropdown-content">
                        <span className="dropdown-title">일</span>
                        <img
                          src={adminDropdownLine}
                          className="dropdown-line"
                          alt=""
                        />

                        {Array.from({ length: 31 }, (_, i) => i + 1).map(
                          (day) => (
                            <div
                              key={day}
                              className="dropdown-option"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDay(`${day}일`);
                                setDayOpen(false);
                              }}
                            >
                              {day}일
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <label>부서</label>
              <SignupInput img={adminEmailBox} placeholder="소속 부서 작성" />

              <div className="signup-button-row">
                <button
                  onClick={() => {
                    const today = new Date();
                    const dateText = `${today.getFullYear()}년 ${
                      today.getMonth() + 1
                    }월 ${today.getDate()}일`;

                    setJoinDate(dateText);
                    localStorage.setItem("joinDate", dateText);
                    setPage("login");
                  }}
                >
                  <img src={adminSignupButton} alt="" />
                  <span>가입하기</span>
                </button>

                <button onClick={() => setPage("login")}>
                  <img src={adminSignupCancelButton} alt="" />
                  <span>가입취소</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {page === "findPassword" && (
        <main className="login-wrap">
          <div className="login-box">
            <img src={adminLoginPanel} className="login-panel" alt="" />

            <div className="login-content">
              <h1>비밀번호 찾기</h1>

              <label>이메일</label>
              <div className="input-box">
                <img src={adminEmailBox} alt="" />
                <input type="email" placeholder="이메일 입력" />
              </div>

              <label>이름</label>
              <div className="input-box">
                <img src={adminEmailBox} alt="" />
                <input placeholder="이름 입력" />
              </div>

              <button
                className="login-button"
                onClick={() => setPage("findPasswordVerify")}
              >
                <img src={adminLoginButton} alt="" />
                <span>확인</span>
              </button>
            </div>
          </div>
        </main>
      )}

      {page === "findPasswordVerify" && (
        <main className="login-wrap">
          <div className="login-box">
            <img src={adminLoginPanel} className="login-panel" alt="" />

            <div className="login-content">
              <h1>비밀번호 찾기</h1>

              <button className="resend-button">
                <img src={adminResendBox} alt="" />
                <span>재발송</span>
              </button>

              <div className="verify-area">
                <label>이메일 인증</label>

                <div className="verify-row">
                  <div className="verify-input-box">
                    <input
                      placeholder="인증코드 입력"
                      value={verifyCode}
                      onChange={(e) => setVerifyCode(e.target.value)}
                    />
                    <img src={adminVerifyLine} alt="" />
                  </div>

                  <span className="verify-time">
                    {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
                    {String(timeLeft % 60).padStart(2, "0")}
                  </span>

                  <div className="verify-small-button" onClick={handleVerifyCode}>
                    {isVerified ? (
                      <img
                        src={adminVerifySuccess}
                        className="verify-success-icon"
                        alt=""
                      />
                    ) : (
                      <>
                        <img src={adminVerifyButton} alt="" />
                        <span>확인</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <button
                className="login-button"
                onClick={() => {
                  if (!isVerified) {
                    alert("이메일 인증을 먼저 완료해주세요.");
                    return;
                  }

                  setPage("changePassword");
                }}
              >
                <img
                  src={
                    isVerified
                      ? adminVerifyCompleteButton
                      : adminVerifyConfirmBox
                  }
                  alt=""
                />
                <span>확인</span>
              </button>

              <p className="verify-help">인증번호를 받지 못하셨나요?</p>
            </div>
          </div>
        </main>
      )}

      {page === "changePassword" && (
        <main className="login-wrap">
          <div className="login-box">
            <img src={adminLoginPanel} className="login-panel" alt="" />

            <div className="login-content">
              <h1>비밀번호 변경</h1>

              <label>새 비밀번호 입력</label>
              <div className="input-box">
                <img src={adminNewPasswordBox} alt="" />
                <input
                  type="password"
                  placeholder="비밀번호 입력"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <label>비밀번호 확인</label>
              <div className="input-box">
                <img src={adminNewPasswordBox} alt="" />
                <input
                  type="password"
                  placeholder="비밀번호 입력"
                  value={newPasswordCheck}
                  onChange={(e) => setNewPasswordCheck(e.target.value)}
                />
              </div>

              <button className="login-button" onClick={handleChangePassword}>
                <img src={adminChangePasswordButton} alt="" />
                <span>변경하기</span>
              </button>
            </div>
          </div>
        </main>
      )}

      {showWithdrawModal && (
        <div className="withdraw-modal-bg">
          <div className="withdraw-modal">
            <img src={withdrawBox} className="withdraw-box-img" alt="" />

            <img src={withdrawTrash} className="withdraw-trash-img" alt="" />

            <div className="withdraw-title">정말 회원 탈퇴 하시겠습니까?</div>

            <div className="withdraw-text">
              탈퇴시, 계정은 삭제되며
              <br />
              복구되지 않습니다.
            </div>

            <div
              className="withdraw-confirm"
              onClick={() => {
                setShowWithdrawModal(false);
                setPage("login");
              }}
            >
              <img src={withdrawConfirm} alt="" />
              <span className="withdraw-button-text">확인</span>
            </div>

            <div
              className="withdraw-cancel"
              onClick={() => setShowWithdrawModal(false)}
            >
              <img src={withdrawCancel} alt="" />
              <span className="withdraw-button-text">취소</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PrintLogRow({ log }) {
  return (
    <>
      <div>{log.printerName}</div>
      <div>{log.userName}</div>
      <div>{log.startTime}</div>
      <div>{log.endTime}</div>
      <div
        className={
          log.status === "정상"
            ? "history-status-normal"
            : "history-status-error"
        }
      >
        {log.status}
      </div>
    </>
  );
}

function PrinterCard({
  img,
  label,
  status,
  name,
  buttonImg,
  buttonText,
  onButtonClick,
}) {
  return (
    <div className="home-printer-card">
      <div className="home-printer-box">
        <img src={img} alt="" />
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