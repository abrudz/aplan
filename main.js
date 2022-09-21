w = window; params = new URLSearchParams(w.location.search);

run = async (id) => {
    
    let socket = new WebSocket("wss://dyalog.run/api/v0/ws/execute");
    socket.onopen = () => {
     json=JSON.stringify(input.value?input.value:input.getAttribute("placeholder")).replace(/\'/g, "''")
     socket.send(
      MessagePack.encode({
        language: "dyalog_apl",
        code:
   `⎕FIX'file://',(2⎕NQ#'GetEnvironment' 'DYALOG'),'/StartupSession/Dyalog/Array.apln'
    'display' 'box'⎕CY'dfns'
     Show←{
         2=⎕NC'⍵':#.display ⍵
         0::'[namespace]'
         r←⍵.((⊂,'←',⊂∘∇∘⍎)¨⎕NL-2 9)
         r,←⍵.((⊂,'←',⊂∘⎕CR)¨⎕NL-3 4)
         #.box⎕FMT↑r[⍋r]
     }
     ⎕TRAP←0 'E' '⎕←1⎕JSON,⊂⎕DMX.EM'
     ⎕←1⎕JSON↓⎕FMT Show Array.Deserialise 0⎕JSON'${json}'`,
        timeout: 1,
      })
    );
  };
  
  socket.onmessage = async (event) => {
    try { 
     const stream = await MessagePack.decodeAsync(event.data.stream())
     output.value = JSON.parse(new TextDecoder().decode(stream.stdout)).join("\n");
    } catch {
     output.value = 'Internal Server Error';
   }
  };
}
  
Copy = () => {
  w.history.replaceState({},w.document.title,w.location.pathname + "?a=" + encodeURIComponent(input.value) );
  
  navigator.clipboard.writeText(w.location.toString().replace("#",""))
}

if (params.get("a") != null) { input.value = decodeURIComponent(params.get("a")); }

