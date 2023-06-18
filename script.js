const buttonContainer = document.getElementById("button-container");
const buttonStyles = [];

for (let i = 0; i < 40; i++) {
    const newBtn = {
        name: `Botón ${i + 1}`,
        class: `button-style-${i + 1}`
    };
    buttonStyles.push(newBtn);
}
buttonStyles.forEach((style) => {
    const button = document.createElement("button");
    button.textContent = style.name;
    button.classList.add("button", style.class);
    buttonContainer.appendChild(button);

    button.addEventListener("click", () => {
        const className = style.class;
        const cssText = getCSSRuleTextByClass(className);
        copyToClipboard(cssText);

        showNotification("CSS copiado");
    });
});

function getCSSRuleTextByClass(className) {
    const styleSheets = document.styleSheets;
    let cssText = '';

    for (let i = 0; i < styleSheets.length; i++) {
        const styleSheet = styleSheets[i];
        const rules = styleSheet.cssRules || styleSheet.rules;

        for (let j = 0; j < rules.length; j++) {
            const rule = rules[j];

            if (rule.selectorText === `.${className}` || rule.selectorText === `.${className}:hover`) {
                cssText += rule.cssText + '\n';
            }
        }
    }
    return cssText;
}
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function showNotification(message) {
    var notification = document.getElementById("notification");
    notification.innerHTML = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}
