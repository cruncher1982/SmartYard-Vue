import { ref } from "vue";
import { useLocaleStore } from "../store/locale";


export default () => {
    const { t } = useLocaleStore()

    const eventNames = ref<{ [key: string]: string }>({
        '1': t('events.call_unanswered'),
        '2': t('events.сall_answered'),
        '3': t('events.open_by_key'),
        '4': t('events.open_from_app'),
        '5': t('events.open_by_face'),
        '6': t('events.open_by_code'),
        '7': t('events.open_gates_by_call'),
        default: t('events.unknown')
    })

    return {
        eventNames
    }
}