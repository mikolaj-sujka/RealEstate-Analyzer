import { useTranslation } from 'react-i18next'

export function useTranslate() {
    const { t, i18n } = useTranslation()
    const changeLanguage = (lng: string) => i18n.changeLanguage(lng)
    return { t, changeLanguage }
}
