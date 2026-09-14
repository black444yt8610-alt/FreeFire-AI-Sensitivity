const SUPABASE_FUNCTION="https://cvwkvwvdtvmhlqpdyojn.supabase.co/functions/v1/freefire-sensitivity";
const intro=document.querySelector("#intro"),loader=document.querySelector("#loader"),app=document.querySelector("#app");
const result=document.querySelector("#result"),statusBox=document.querySelector("#status"),form=document.querySelector("#form"),askBtn=document.querySelector("#askBtn");

document.querySelector("#enterBtn").onclick=()=>{intro.classList.add("hidden");loader.classList.remove("hidden");setTimeout(()=>{loader.classList.add("hidden");app.classList.remove("hidden")},1200)};

form.addEventListener("submit",async e=>{
 e.preventDefault(); result.classList.add("hidden"); statusBox.textContent="Gemini is analyzing your profile...";
 askBtn.disabled=true; askBtn.textContent="ANALYZING...";
 try{
  const payload={
   device_name:document.querySelector("#device").value.trim(),
   player_style:document.querySelector("#style").value,
   graphics:document.querySelector("#graphics").value,
   language:document.querySelector("#language").value.trim()||"English"
  };
  const res=await fetch(SUPABASE_FUNCTION,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
  const data=await res.json(); if(!res.ok) throw new Error(data.error||"Request failed");
  result.textContent=data.reply; result.classList.remove("hidden");
  statusBox.textContent=data.saved?"Recommendation generated and saved to Supabase.":"Recommendation generated.";
 }catch(err){statusBox.textContent="Error: "+err.message}
 finally{askBtn.disabled=false;askBtn.textContent="GET AI SENSITIVITY"}
});