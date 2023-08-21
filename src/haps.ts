(function () {
    const w: Window &
        typeof globalThis & { hapsIntervalId: number | undefined } =
        window as any;

    if (w.hapsIntervalId) {
        clearInterval(w.hapsIntervalId);
        return;
    }

    w.hapsIntervalId = setInterval(() => {
        const elements = [...document.querySelectorAll("a")];

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const content = element.textContent || "";
            const skip =
                element.classList.contains("hapsable") || content.trim() === "";

            if (skip) {
                continue;
            }

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
            if (e.ctrlKey && e.altKey) {
                document.body.classList.add("haps");
            }
        });

        document.addEventListener("keyup", (e) => {
            if (!e.ctrlKey || !e.altKey) {
                document.body.classList.remove("haps");
            }
        });
    }, 1000);
})();
