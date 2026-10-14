import { mount } from "@vue/test-utils";
import { describe, it } from "vitest";
import BarChartCard from "./BarChartCard.vue";

describe('BaseCard', () => {
    it('renders', () => {
        mount(BarChartCard, {
            props: {
                title: 'Test Card',
                data: { 'London': 5 },
            }
        })
    })
})