// ==UserScript==
// @name        Facebook - HBC Group Count User Activity
// @namespace   Violentmonkey Scripts
// @match       https://www.facebook.com/groups/*
// @grant       none
// @version     2.0
// @author      everruler
// @description 2020-06-20
// @require     https://cdn.jsdelivr.net/npm/jquery@3.4.1
// @require     https://cdn.jsdelivr.net/npm/vue/dist/vue.js
// @require     https://greasyfork.org/scripts/392969-bulma-css-framework/code/bulma-css-framework.js?version=753268
// ==/UserScript==

// from http://com.hemiola.com/2015/08/29/expand-all/
// I’ve decided to still call first-level comments *comments* and second-level comments *replies*, but when I mean either, I call them *responses*.


// Expand All
// http://com.hemiola.com/bookmarklet/


setTimeout(init, 500)

function init() {

    const head = /* html */ `
<style>

#vm_app {
}

[aria-label="User Activity"] {
    width: 7em;
    color: #e4e6eb;
}

#vm_container {
}

#vm_textarea {
    height: 30em;
    width: 100%;
}
</style>
`


    const app = /* html */ `
<div class="bp9cbjyn j83agx80 datstx6m taijpn5t oi9244e8" id="vm_app">
    <span class="tojvnm2t a6sixzi8 abs2jz4q a8s20v7p t1p8iaqh k5wvi7nf q3lfd5jv pk4s997a bipmatt0 cebpdrjk qowsmv63 owwhemhu dp1hu0rb dhp61c6y iyyx5f41">
        <div class="rq0escxv l9j0dhe7 du4w35lb">
            <div aria-label="User Activity" @click="showContainer = !showContainer" class="oajrlxb2 tdjehn4e qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 j83agx80 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl l9j0dhe7 abiwlrkh p8dawk7l bp9cbjyn s45kfl79 emlxlaya bkmhp75w spb7xbtv rt8b4zig n8ej3o3l agehan2d sk4xxmp2 taijpn5t qypqp5cg q676j6op" role="button" tabindex="0">
                <span>User Activity</span>
            </div>
        </div>
    </span>

    <div v-show="showContainer" class="j34wkznp qp9yad78 pmk7jnqg kr520xx4" style="transform: translate(220px, 50px) translate(-100%, 0px);">
    <div class="iqfcb0g7 tojvnm2t a6sixzi8 k5wvi7nf q3lfd5jv pk4s997a bipmatt0 cebpdrjk qowsmv63 owwhemhu dp1hu0rb dhp61c6y l9j0dhe7 iyyx5f41 a8s20v7p" data-testid="Keycommand_wrapper_ModalLayer" tabindex="-1">
        <div class="" data-pagelet="root">
            <div class="knvmm38d">
                <div aria-label="User Activity Panel" class="l9j0dhe7" role="dialog">
                    <div class="cwj9ozl2 ue3kfks5 pw54ja7n uo3d90p7 l82x9zwi nwpbqux9 rq0escxv jgsskzai ni8dbmo4 stjgntxs">
                        <div class="o8kakjsu rpm2j7zs k7i0oixp gvuykj2m j83agx80 cbu4d94t d76ob5m9 eg9m0zos qan41l3s c3g1iek1 t1wsaese h77mwsce o36gj0jk">
                            <div class="a8s20v7p k5wvi7nf buofh1pr pfnyh3mw l9j0dhe7 du4w35lb">
                                <div class="dbpd2lw6 l9j0dhe7 stjgntxs ni8dbmo4 lzcic4wl idiwt2bm" style="height: 431.25px;">
                                    <div class="kr520xx4 pedkr2u6 ms05siws pnx7fd3z b7h9ocf4 pmk7jnqg j9ispegn k4urcfbm" style="transform: translateX(0%) translateZ(1px);">

                                        <div style='text-align: center;'>
                                        <button class="button is-link is-rounded" @click="expand">See More</button>
                                        <button class="button is-link is-rounded" @click="count">Count</button>
                                        <button class="button is-link is-rounded" @click="copy" v-show="!!textarea">Copy</button>
                                        </div>
                                        <hr class="aov4n071 dhix69tm wkznzc2l bi6gxh9e pwoa4pd7">
                                        <textarea id="vm_textarea" class="textarea" v-model="textarea"></textarea>
                                        <br>
                                        <br>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div></div>
    </div>
</div>
</div>
`

    $('head').append($(head))
    $('div[aria-label="Account Controls and Settings"]').append($(app))
    console.log('user activity app added')

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
                // These are subject to change when facebook updates
                var selectors_to_count = {
                    responses: {
                        container: '.c1et5uql.bvz0fpym.sf5mxxl7.q9uorilb',
                        name: '.nc684nl6 > a.oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.rq0escxv.nhd2j8a9.nc684nl6.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.gmql0nx0.gpro0wi8',
                        content: '.ecm0bbzt.e5nlhep0.a8c37x1j'
                    },
                    posts: {
                        container: '.du4w35lb.k4urcfbm.l9j0dhe7.sjgh65i0',
                        name: 'h3.gmql0nx0.l94mrbxd.p1ri9a11.lzcic4wl.aahdfvyu.hzawbc8m:first-child a.oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.rq0escxv.nhd2j8a9.nc684nl6.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.oo9gr5id.gpro0wi8.lrazzd5p',
                        content: '.ecm0bbzt.hv4rvrfc.dati1w0a'
                    }
                }

                var results = {}
                var unique = []

                Object.keys(selectors_to_count).forEach((key) => {
                    const selector = selectors_to_count[key]
                    const listOfNames = {}

                    $(selector.container).toArray().forEach(x => {
                        const name = $(x).find(selector.name).text()
                        const content = $(x).find(selector.content).text()

                        listOfNames[name] ? listOfNames[name].push(content) : listOfNames[name] = [content]
                    })

                    results[key] = listOfNames
                    unique = [...new Set(unique.concat(...Object.keys(listOfNames)))]
                })

                console.log(results)

                var sorted_totals = unique.map(name => {
                    count_responses = results.responses[name] ? results.responses[name].length : 0
                    count_posts = results.posts[name] ? results.posts[name].length : 0

                    return {
                        count: count_responses + count_posts,
                        name
                    }
                }).sort((a, b) => (a.count < b.count) ? 1 : -1)

                console.log('\nScript ran at: ' + new Date() + '\n', sorted_totals)

                let j = 0
                vm.textarea = 'Check console for totals, and double-check for ties!\n------------------------------------\n' + sorted_totals
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
                // click on all "See More" divs on new Facebook design after running ExpandAll bookmarklet, then run bookmarklet again
                [...document.getElementsByTagName('div')].filter(x => x.innerText == "See More").forEach(x => x.click())
            }
        },
        watch: {

        },
        mounted: function() {

        }
    })
}
