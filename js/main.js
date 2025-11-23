document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash-screen');
  const app = document.getElementById('app');
  const chatHistory = document.getElementById('chat-history');
  const messageInput = document.getElementById('messageInput');
  const sendBtn = document.getElementById('sendButton');
  const loading = document.getElementById('loading');
  const themeToggle = document.getElementById('theme');
  const settingIcon = document.getElementsByClassName('setting')[0];
  const settingsPanel = document.getElementById("setting");

  // Splash
  setTimeout(() => {
    splash.style.display = 'none';
    app.classList.remove('hidden');
  }, 1000);

  // Theme Switch
  themeToggle.addEventListener('change', () => {
    document.body.className = themeToggle.checked ? 'light' : 'dark';
  });

  // Toggle Settings Panel
  settingIcon.addEventListener('click', () => {
    settingsPanel.style.display =
      settingsPanel.style.display === "block" ? "none" : "block";
  });

  // Send message
  const sendMessage = async () => {
    const text = messageInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    messageInput.value = "";
    loading.classList.remove("hidden");

    try {
      const response = await fetch("http://localhost:4000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();
      loading.classList.add("hidden");

      addMessage(data.reply, "bot");

    } catch (err) {
      loading.classList.add("hidden");
      addMessage("⚠️ حدث خطأ في الاتصال بالسيرفر", "bot");
    }
  };

  sendBtn.addEventListener("click", sendMessage);
  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  function addMessage(msg, type) {
    const div = document.createElement("div");
    div.classList.add("message", type === "user" ? "user-message" : "bot-message");
    div.textContent = msg;
    chatHistory.appendChild(div);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }
});
