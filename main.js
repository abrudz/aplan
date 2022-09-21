w = window; params = new URLSearchParams(w.location.search);

run = async (id) => {
    const i = document.getElementById(id);
  
    let socket = new WebSocket("wss://dyalog.run/api/v0/ws/execute");
  
    socket.onopen = () => {
     if (i.value == ""){ expr = i.getAttribute("placeholder"); } else { expr = i.value }
     socket.send(
      MessagePack.encode({
        language: "dyalog_apl",
        code:
   `⎕FIX'file://',(2⎕NQ#'GetEnvironment' 'DYALOG'),'/StartupSession/Dyalog/Array.apln'
    'display'⎕CY'dfns'
     Show←{
         2=⎕NC'⍵':display ⍵
         0::'[namespace]'
         r←⍵.((⊂,⊂∘∇∘⍎)¨⎕NL-2 9)
         r,←⍵.((⊂,⊂∘⎕CR)¨⎕NL-3 4)
         ↑r[⍋r]
     }
     ⎕←1⎕JSON↓⎕FMT Show Array.Deserialise 0⎕JSON'${JSON.stringify(input.value).replace(/\'/g, "''")}'`,
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
run('input')
