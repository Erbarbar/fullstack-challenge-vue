import { mount } from "@vue/test-utils";
import { describe, it } from "vitest";
import BaseCard from "./BaseCard.vue";

describe('BaseCard', () => {
    it('renders', () => {
        mount(BaseCard)
    })
})