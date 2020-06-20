// ==UserScript==
// @name        Facebook - HBC Group Count User Activity
// @namespace   Violentmonkey Scripts
// @match       https://www.facebook.com/groups/*
// @grant       none
// @version     1.0
// @author      everruler
// @description 12/30/2019
// @require     https://cdn.jsdelivr.net/npm/jquery@3.4.1
// @require     https://cdn.jsdelivr.net/npm/vue/dist/vue.js
// @require     https://greasyfork.org/scripts/392969-bulma-css-framework/code/bulma-css-framework.js?version=753268
// ==/UserScript==

// Expand All
// http://com.hemiola.com/bookmarklet/


const head = /* html */ $(`
<style>

#vm_app {
    position: fixed;
    bottom: 25px;
    right: 230px;
    text-align: right;
    z-index: 999;
}

#vm_container {
}

#vm_textarea {
    height: 40em;
    width: 20em;
}
</style>
`)
$('head').append(head)



const body = /* html */ $(`
<div id="vm_app">
    <div class="bulma">
        <div id="vm_container" v-show="showContainer">
            <textarea id="vm_textarea" class="textarea" v-model="textarea"></textarea>
            <br>
            <button class="button is-link is-rounded" @click="copy" v-show="!!textarea">Copy</button>
            <button class="button is-link is-rounded" @click="expand">Expand</button>
            <button class="button is-link is-rounded" @click="count">Count</button>
        </div>
        <br>

        <button class="button is-link is-rounded" @click="showContainer = !showContainer">User Activity</button>
    </div>
</div>

<script>

</script>
`)
$('body').append(body)



var vm = new Vue({
    el: '#vm_app',
    data: {
        textarea: '',
        showContainer: false,
        teachers: ['Improvement Pill', 'Erik Newhard']
    },
    computed: {},
    methods: {
        count: () => {
            // These are subject to change when favebook updates
            var selectors_to_count = {
                comments: {
                    full: '._6qw3',
                    name: '._6qw4'
                },
                posts: {
                    full: '.userContentWrapper>div:first-child',
                    name: 'h5 .fwb'
                }
            }

            var results = {}
            var unique = []

            Object.keys(selectors_to_count).forEach((key) => {
                const selector = selectors_to_count[key]
                const listOfNames = {}

                $(selector.full).toArray().forEach(x => {
                    const name = $(x).find(selector.name).text()
                    const full = $(x).text()

                    listOfNames[name] ? listOfNames[name].push(full) : listOfNames[name] = [full]
                })

                results[key] = listOfNames
                unique = [...new Set(unique.concat(...Object.keys(listOfNames)))]
            })

            var sorted_totals = unique.map(name => {
                count_comments = results.comments[name] ? results.comments[name].length : 0
                count_posts = results.posts[name] ? results.posts[name].length : 0

                return {
                    count: count_comments + count_posts,
                    name
                }
            }).sort((a, b) => (a.count < b.count) ? 1 : -1)

            console.log(sorted_totals)

            let j = 0
            vm.textarea = 'Check console for totals,\nand double-check for ties!\n------------------------------------\n' + sorted_totals
                .reduce((acc, x) => {
                    const isTeacher = vm.teachers.includes(x.name)
                    if (!isTeacher) {
                        j++
                        acc.push(`#${j} ${x.name}`)
                    }
                    return acc
                }, []).join('\n')
        },
        copy() {
            var textarea = document.getElementById('vm_textarea')
            textarea.select()
            document.execCommand("copy")
            // alert('Copied!')
        },
        expand() {
            EXPAND_COMMENTS()
        }
    },
    watch: {

    },
    mounted: function() {

    }
})
