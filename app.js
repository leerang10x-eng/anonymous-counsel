const SUPABASE_URL = "https://saasxzzuddwmwkogbzuw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "
  sb_publishable_xM7Ebh7BMwfLaC9Bd23Dqg_eGYksnkc";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

const enterButton = document.getElementById("enterButton");
const roomCodeInput = document.getElementById("roomCode");
const message = document.getElementById("message");

enterButton.addEventListener("click", async () => {
  const roomCode = roomCodeInput.value.trim();

  if (!roomCode) {
    message.textContent = "입장 코드를 입력해주세요.";
    return;
  }

  message.textContent = "연결을 확인하는 중입니다...";

  try {
    const { data, error } = await supabaseClient
      .from("rooms")
      .select("id, room_code, status")
      .eq("room_code", roomCode)
      .maybeSingle();

    if (error) {
      console.error(error);
      message.textContent = "서버 연결에 문제가 있습니다.";
      return;
    }

    if (!data) {
      message.textContent = "존재하지 않는 입장 코드입니다.";
      return;
    }

    if (data.status !== "active") {
      message.textContent = "현재 상담이 종료되었습니다.";
      return;
    }

    message.textContent = "입장 코드가 확인되었습니다!";
  } catch (error) {
    console.error(error);
    message.textContent = "서버에 연결할 수 없습니다.";
  }
});
