document.getElementById('start-btn').addEventListener('click',()=> {
    if ('webkitSpeechRecognition' in window||'SpeechRecognition' in window) {
        const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
        const recognition=new SpeechRecognition();
        recognition.lang='en-US';
        recognition.start();
        recognition.onstart=()=>{
            console.log('Voice recognition started. Speak into the microphone.');
        };
        recognition.onspeechend=()=>{
            recognition.stop();
        };
        recognition.onresult=(event)=>{
            const speechResult=event.results[0][0].transcript.toLowerCase();
            speak(`showing results for ${speechResult}`);
            if (speechResult.includes('open calculator')) {
                speak('Opening calculator');
                window.open('calculator://');
            } else if(speechResult.includes('open whatsapp')||speechResult.includes('open whatsapp')){
                speak('Opening whatsapp');
                window.open('WhatsApp://');
            }else {
                speak(`Searching for ${speechResult}`);
                const googleSearchURL=`https://www.google.com/search?q=${encodeURIComponent(speechResult)}`;
                window.location.href=googleSearchURL;
            }
        };
        recognition.onerror=(event)=>{
            console.error('Error occurred in recognition: ', event.error);
        };
    }else{
        alert('Your browser does not support voice recognition.');
    }
});
function speak(text){
    const utterance=new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}
