const smoke = document.getElementById("smoke");
const temperature = document.getElementById("temperature");
const maintenance = document.getElementById("maintenance");

const systemStatus = document.getElementById("systemStatus");
const exhaustBox = document.getElementById("exhaustBox");
const alarmBox = document.getElementById("alarmBox");
const exhaustText = document.getElementById("exhaustText");
const alarmText = document.getElementById("alarmText");

const valueA = document.getElementById("valueA");
const valueB = document.getElementById("valueB");
const valueC = document.getElementById("valueC");
const valueS = document.getElementById("valueS");
const message = document.getElementById("message");

function atualizarSistema() {
  const A = smoke.checked ? 1 : 0;
  const B = temperature.checked ? 1 : 0;
  const C = maintenance.checked ? 1 : 0;

  // Regra de negócio:
  // S = A OR (NOT A AND B AND NOT C)
  const S = A || (!A && B && !C) ? 1 : 0;

  valueA.textContent = A;
  valueB.textContent = B;
  valueC.textContent = C;
  valueS.textContent = S;

  if (S === 1) {
    exhaustText.textContent = "LIGADA";
    alarmText.textContent = "EMERGÊNCIA";
    exhaustBox.classList.add("active");
    alarmBox.classList.add("active");
    systemStatus.textContent = "EMERGÊNCIA ATIVA";
    systemStatus.className = "status danger";

    if (A === 1) {
      message.textContent = "Fumaça detectada.";
    } else {
      message.textContent = "Superaquecimento detectado.";
    }
  } else {
    exhaustText.textContent = "DESLIGADA";
    alarmText.textContent = C === 1 && B === 1 ? "INIBIDO" : "NORMAL";
    exhaustBox.classList.remove("active");
    alarmBox.classList.remove("active");

    if (C === 1) {
      systemStatus.textContent = "MODO MANUTENÇÃO";
      systemStatus.className = "status maintenance";
      message.textContent = "Modo de manutenção ativo. O acionamento térmico está inibido.";
    } else {
      systemStatus.textContent = "SISTEMA NORMAL";
      systemStatus.className = "status normal";
      message.textContent = "Ambiente normal. Exaustão desligada.";
    }
  }
}

smoke.addEventListener("change", atualizarSistema);
temperature.addEventListener("change", atualizarSistema);
maintenance.addEventListener("change", atualizarSistema);

atualizarSistema();
