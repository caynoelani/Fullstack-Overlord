import overlord from './assets/bot.svg';
import user from './assets/user.svg';

const formPrompt = document.querySelector('#form_prompt');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

function loader(element){
  element.textContent = '';

  loadInterval = setInterval(() => {
    element.textContent += '.';

    if (element.textContent === '....') element.textContent = '';
  }, 250)
}

function typeWriter(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if(index < text.length){
      element.innerHTML += text.chartAt(index);
      index++
    } else {
      clearInterval(interval);
    }
  }, 50);
}

function generateMessageId(){
  let randomId = "id" + Math.random().toString(16).slice(2) + Date.now();

  return randomId;
}

function alternateChatRows(isOverlord, value, messageId) {
  return (
    `
      <div class="wrapper ${isOverlord && 'chat_overlord'}">
        <div class="chat">
          <div className="profile">
            <img
              src="${isOverlord ? overlord : user}"
              alt="${isOverlord ? 'overlord' : 'user'}"
            />
          </div>
          <div class="message" id=${messageId}>${value}</div>
        </div>
      </div>
    `
  )
}

const handleSubmit = async(e) => {
  e.preventDefault();

  const data = new FormData(formPrompt);
  
  chatContainer.innerHTML += alternateChatRows(false, data.get('prompt'));
  formPrompt.reset();

  const messageId = generateMessageId();
  chatContainer.innerHTML += alternateChatRows(true, ' ', messageId);
  
  chatContainer.scrollTop = chatContainer.scrollHeight;
  const latestMessageDiv = document.getElementById(messageId);
  loader(latestMessageDiv);
}

formPrompt.addEventListener('submit', handleSubmit);
formPrompt.addEventListener('keyup', (e) => {
  if(e.keyCode === 13) handleSubmit(e);
})
