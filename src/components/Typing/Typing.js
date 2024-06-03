import { useEffect, useState } from "react";

function Typing({
    text,
    typingSpeed = 100,
    deletingSpeed = 50,
    duration = 1500
}) {
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [index, setIndex] = useState(0);
    const [isWaiting, setIsWaiting] = useState(false);
    const [showCaret, setShowCaret] = useState(true);

    useEffect(() => {
        const handleTyping = () => {
            if (!isDeleting) {
                if (displayedText.length < text[index].length) {
                    setDisplayedText((prev) => prev + text[index].charAt(displayedText.length));
                } else {
                    setIsWaiting(true);
                    setTimeout(() => {
                        setIsWaiting(false);
                        setIsDeleting(true);
                    }, duration);
                }
            } else {
                if (displayedText.length > 0) {
                    setDisplayedText((prev) => prev.slice(0, -1));
                } else {
                    setIsDeleting(false);
                    setIndex((prev) => (prev + 1) % text.length);
                }
            }
        };

        if (!isWaiting) {
            const timeout = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
            return () => clearTimeout(timeout);
        }
    }, [displayedText, isDeleting, index, text, typingSpeed, deletingSpeed, duration, isWaiting]);

    useEffect(() => {
        let caretInterval;
        if (isWaiting) {
            caretInterval = setInterval(() => {
                setShowCaret((prev) => !prev);
            }, 250);
        } else {
            setShowCaret(true);
        }
        return () => clearInterval(caretInterval);
    }, [isWaiting]);

    return (
        <div className="typing-effect">
            {displayedText}
            <span className="caret">{showCaret ? "|" : " "}</span>
        </div>
    );
}

export default Typing;
