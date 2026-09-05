// Runs before the browser paints the rest of the body, so a returning visitor
// who chose dark never sees a flash of the light theme. Rendered as the first
// child of <body> because this app's layouts own <html>/<body> directly.
const script = `(function(){try{var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
