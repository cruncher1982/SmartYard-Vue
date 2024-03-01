// Это не глобальный стор. имеет свой набор событий для каждого экземпляра
// !!! Возможно стоит переместить 

import { Ref, onMounted, ref, watch } from "vue";
import { get } from "../api";
import { Event, EventDay } from "../types/events";

export interface EventStoreItem {
    date: EventDay,
    events: Event[]
}

export const useEvents = (flatIds: Ref<string[]>) => {
    const days = ref<EventDay[]>([])
    const events = ref<Event[]>([])
    const eventsMap = ref<{ [key: string]: Event[] }>({})

    const load = async () => {

        await Promise.all(flatIds.value.map(flatId =>
            get<EventDay[]>('address/plogDays', { flatId })
                .then(days => days.forEach(day => eventsMap.value[day.day] = []))

        ))



        await Promise.all(flatIds.value.map(flatId =>
            Promise.all(Object.keys(eventsMap.value).map(day =>
                get<Event[]>('address/plog', { flatId, day })
                    .then(_events => _events && eventsMap.value[day]?.push(..._events))
            ))
        ));

        console.log(eventsMap.value);


    }

    onMounted(load)
    watch(flatIds, load)

    return {
        eventsMap,
        load
    }
}
