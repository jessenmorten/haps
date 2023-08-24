if ((window as any).hapsInjected) {
    // TODO: Avoid throwing error
    throw new Error("Haps already injected");
} else {
    (window as any).hapsInjected = true;
    console.info("Haps injected");
}

function HapsInit() {
    const elements = [...document.querySelectorAll("a")];
    let newElements = 0;
    let oldElements = 0;
    let skippedElements = 0;

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        if (element.classList.contains("hapsable")) {
            oldElements++;
            continue;
        }

        if (!element.textContent) {
            skippedElements++;
            continue;
        }

        newElements++;
        element.classList.add("hapsable");
        element.addEventListener("click", (e) => {
            if (document.body.classList.contains("haps")) {
                e.preventDefault();
                document.body.classList.remove("haps");
                const content = element.textContent || "";
                navigator.clipboard.writeText(content.trim());
            }
        });
    }

    console.info(
        `Haps: ${newElements} new elements, ${oldElements} old elements, ${skippedElements} skipped elements`,
    );
}

document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.altKey && !e.repeat) {
        document.body.classList.add("haps");
        HapsInit();
    }
});

document.addEventListener("keyup", (e) => {
    if (!e.ctrlKey || !e.altKey) {
        document.body.classList.remove("haps");
    }
});
