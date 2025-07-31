import { IconBook, IconBulb, IconMail, IconMessageCircle, IconPhone, IconQuestionMark } from "@tabler/icons-react";
import { ContactOption, FaqItem, Resource } from "../types/HelpCenter";

export const contactOptions: ContactOption[] = [
    {
        icon: IconMail,
        title: "Email",
        description: "Napisz do nas",
        contact: "pomoc@analyzer.pl",
        color: "blue",
    },
    {
        icon: IconPhone,
        title: "Telefon",
        description: "Zadzwoń do nas",
        contact: "+48 123 456 789",
        color: "green",
    },
    {
        icon: IconMessageCircle,
        title: "Chat",
        description: "Czat na żywo",
        contact: "Dostępny 9:00-17:00",
        color: "orange",
    },
];

export const faqItems: FaqItem[] = [
    {
        question: "Jak interpretować dane na wykresach?",
        answer:
            "Wykresy pokazują trendy cenowe nieruchomości w czasie. Linia niebieska to średnia cena, a obszar szary pokazuje zakres wahań cenowych.",
    },
    {
        question: "Skąd pochodzą dane o nieruchomościach?",
        answer:
            "Dane pochodzą z oficjalnych źródeł rynkowych, notariuszy oraz głównych portali nieruchomości. Są aktualizowane codziennie.",
    },
    {
        question: "Jak korzystać z kalkulatora inwestycyjnego?",
        answer:
            "Wybierz miasto, wprowadź budżet i preferencje. Kalkulator oceni potencjał inwestycyjny używając metody AHP (Analytic Hierarchy Process).",
    },
    {
        question: "Co oznaczają wskaźniki na mapie?",
        answer:
            "Kolory na mapie reprezentują średnie ceny za m². Ciemniejsze kolory oznaczają wyższe ceny, jaśniejsze - niższe.",
    },
];

export const resources: Resource[] = [
    {
        icon: IconBook,
        title: "Przewodnik użytkownika",
        description: "Kompletny przewodnik po wszystkich funkcjach platformy",
    },
    {
        icon: IconBulb,
        title: "Porady inwestycyjne",
        description: "Najlepsze praktyki inwestowania w nieruchomości",
    },
    {
        icon: IconQuestionMark,
        title: "Często zadawane pytania",
        description: "Odpowiedzi na najczęstsze pytania użytkowników",
    },
];