import { mount } from "@vue/test-utils";
import { describe, it } from "vitest";
import DataTable from "./DataTable.vue";
import { mockUsers } from "@tests/mocks/users.mock.ts";

describe('DataTable', () => {
    it('Renders with ascending', async () => {
        const wrapper = mount(DataTable, {
            props: {
                items: mockUsers,
                sortKey: 'name',
                sortOrder: 'asc',
                columns: [
                    { key: 'name', label: 'Name', sortable: true },
                ]
            }

        })
        const header = wrapper.find('th')
        await header.trigger('click')
    })
    it('Renders with descending', () => {
        mount(DataTable, {
            props: {
                items: mockUsers,
                sortKey: 'name',
                sortOrder: 'desc',
                columns: [
                    { key: 'name', label: 'Name', sortable: true },
                ]
            }
        })
    })
})