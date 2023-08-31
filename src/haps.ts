if (!(window as any).hapsInjected) {
    (window as any).hapsInjected = true;
    console.info("Haps injected");

    function getContent(element: Element): string {
        const e = element as unknown as {
            textContent?: string;
            value?: string;
        };
        const content = e.textContent || e.value || "";
        return content.trim();
    }

    function findElements() {
        const elements = [
            ...document.querySelectorAll("a"),
            ...document.querySelectorAll("button"),
            ...document.querySelectorAll(`input[type="submit"]`),
            ...document.querySelectorAll(`input[type="button"]`),
        ];
        let newElements = 0;
        let oldElements = 0;
        let skippedElements = 0;

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            if (element.classList.contains("hapsable")) {
                oldElements++;
                continue;
            }

            if (!getContent(element).match(/[a-zA-Z]/)) {
                skippedElements++;
                continue;
            }

            newElements++;
            element.classList.add("hapsable");
            element.addEventListener("click", (e) => {
                if (document.body.classList.contains("haps")) {
                    e.preventDefault();
                    document.body.classList.remove("haps");
                    navigator.clipboard.writeText(getContent(element));
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
            findElements();
        }
    });

    document.addEventListener("keyup", (e) => {
        if (!e.ctrlKey || !e.altKey) {
            document.body.classList.remove("haps");
        }
    });
}
