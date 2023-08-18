const elements = [
    ...document.querySelectorAll("p"),
    ...document.querySelectorAll("a"),
    ...document.querySelectorAll("button"),
    ...document.querySelectorAll("span"),
    ...document.querySelectorAll("h1"),
    ...document.querySelectorAll("h2"),
    ...document.querySelectorAll("h3"),
    ...document.querySelectorAll("h4"),
    ...document.querySelectorAll("h5"),
    ...document.querySelectorAll("h6"),
];

for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    element.classList.add("hapsable");

    element.addEventListener("click", (e) => {
        if (document.body.classList.contains("haps")) {
            e.preventDefault();
            document.body.classList.remove("haps");
            const content = element.textContent || "";
            navigator.clipboard.writeText(content);
        }
    });
}

document.addEventListener("keydown", (e) => {
    if (e.altKey) {
        document.body.classList.add("haps");
    }
});

document.addEventListener("keyup", (e) => {
    if (!e.altKey) {
        document.body.classList.remove("haps");
    }
});
