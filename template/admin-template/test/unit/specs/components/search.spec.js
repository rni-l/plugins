/* eslint-disable */
import { createTest, createVue, destroyVM } from '../../utils'
import Search from '../../../../src/components/search'

describe('Components Search', () => {
	let vm
	afterEach(() => {
		destroyVM(vm)
	})

	it('create', () => {
		vm = createTest(Search, {
			type: 'primary'
		})
		let $el = vm.$el
		console.log($el)
		expect($el.classList.contains('u-search')).to.be.ok
	})
})
