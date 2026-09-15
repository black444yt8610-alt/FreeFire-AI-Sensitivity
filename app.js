const PLAYER_API="https://cvwkvwvdtvmhlqpdyojn.supabase.co/functions/v1/nexaro-player-v6";
const SENS_API="https://cvwkvwvdtvmhlqpdyojn.supabase.co/functions/v1/freefire-sensitivity-v5";
const $=id=>document.getElementById(id); let player=null;

async function loadStates(){const r=await fetch(PLAYER_API);const d=await r.json();for(const s of d.states||[]){const o=document.createElement("option");o.value=s;o.textContent=s;$("state").appendChild(o)}}
loadStates().catch(()=>{$("status").textContent="Could not load states. Check your connection."});

$("verify").onclick=async()=>{const uid=$("uid").value.trim(),state=$("state").value;$("status").textContent="Checking India server registry…";
try{const r=await fetch(PLAYER_API,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({uid,state})});const d=await r.json();
if(!r.ok){$("status").textContent=d.message||"UID verification failed.";return} player=d.player;
$("login").classList.add("hidden");$("dashboard").classList.remove("hidden");
$("nickname").textContent=player.nickname||"Verified Player";$("meta").textContent=`UID ${player.uid} • ${player.state}`;
$("puid").textContent=player.uid;$("pstate").textContent=player.state;$("plevel").textContent=player.level??"—";$("plikes").textContent=player.likes??"—";
}catch(e){$("status").textContent="Network error. Try again."}};

$("openSensitivity").onclick=()=>$("sensitivity").classList.toggle("hidden");

$("generate").onclick=async()=>{$("result").textContent="Generating…";
const payload={device_name:$("device").value.trim(),ram_gb:Number($("ram").value)||null,refresh_rate_hz:Number($("refresh").value)||null,touch_sampling_hz:Number($("touch").value)||null,dpi:Number($("dpi").value)||null,width_px:Number($("width").value)||null,height_px:Number($("height").value)||null,game:"Free Fire",game_version:"current",fps:$("fps").value.trim(),player_style:$("style").value,graphics:$("graphics").value,calibration:"Nexaro V6 profile",language:"English"};
try{const r=await fetch(SENS_API,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});const d=await r.json();if(!r.ok){$("result").textContent=d.message||d.code||"Sensitivity request failed.";return}$("result").textContent=JSON.stringify({device:d.device,baseline:d.baseline,analysis:d.reply,saved:d.saved,request_id:d.request_id},null,2)}catch(e){$("result").textContent="Network error. Try again."}};
