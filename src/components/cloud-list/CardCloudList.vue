<template>
    <div class="card-container">
        <div class="base-card card-item card-bd">
            <div class="card-bd__header">
                <base-button-option @option-toggled="toggleMenu" v-if="isAdmin">
                    <ul>
                        <li @click.stop.self="showRemoveActions = true" class="base-button-option__menu__remove">
                          {{ $t('project_list.remove') }}
                          <transition name="slide-fade">
                            <div class="delete__actions" v-if="showRemoveActions">
                              <span class="check" @click.native="remove">
                                <svgicon name="check" height="15" width="18"></svgicon>
                              </span>
                              <span class="check-cross" @click.native="showRemoveActions = false">
                                <svgicon name="close"  height="13" width="13"></svgicon>
                              </span>
                            </div>
                          </transition>
                        </li>
                    </ul>
                </base-button-option>
            </div>
            <div class="card-bd__body">
                <div class="card-bd__body-container">
                    <div class="card-bd__circle" @click.prevent="accessCloud">
                        <div class="card-bd__picto-container">
                            <svgicon name="image-plus" height="26" width="26"></svgicon>
                        </div>
                        <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIzLjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhbHF1ZV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTEwIDUwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMTAgNTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojMzAzNzRCO30KCS5zdDF7ZmlsbDojRjlDNzJDO30KPC9zdHlsZT4KPGc+Cgk8Zz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjYuMzEsMzIuMTJWMTkuOTNoNC4xOGMxLjM4LDAsMi40MywwLjI4LDMuMTUsMC44M2MwLjcyLDAuNTUsMS4wOCwxLjM4LDEuMDgsMi40NwoJCQljMCwwLjU2LTAuMTUsMS4wNi0wLjQ1LDEuNTFjLTAuMywwLjQ1LTAuNzQsMC43OS0xLjMyLDEuMDRjMC42NiwwLjE4LDEuMTcsMC41MSwxLjUzLDEuMDFjMC4zNiwwLjQ5LDAuNTQsMS4wOSwwLjU0LDEuNzgKCQkJYzAsMS4xNC0wLjM3LDIuMDItMS4xLDIuNjRjLTAuNzMsMC42MS0xLjc4LDAuOTItMy4xNSwwLjkySDI2LjMxeiBNMjguNDMsMjUuMDZoMi4wOGMwLjY2LDAsMS4xNy0wLjE1LDEuNTQtMC40NQoJCQlzMC41Ni0wLjcyLDAuNTYtMS4yN2MwLTAuNi0wLjE3LTEuMDQtMC41MS0xLjMxYy0wLjM0LTAuMjctMC44OC0wLjQtMS42LTAuNGgtMi4wNlYyNS4wNnogTTI4LjQzLDI2LjYydjMuODFoMi4zNQoJCQljMC42NiwwLDEuMTgtMC4xNiwxLjU2LTAuNDljMC4zNy0wLjMzLDAuNTYtMC43OSwwLjU2LTEuMzdjMC0xLjI3LTAuNjUtMS45MS0xLjk0LTEuOTRIMjguNDN6Ii8+CgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTM5LjM2LDMyLjEyaC0yLjExVjE5LjkzaDIuMTFWMzIuMTJ6Ii8+CgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTQ0LjcsMTkuOTNsMy41MSw5LjM0bDMuNTEtOS4zNGgyLjc0djEyLjE4aC0yLjExVjI4LjFsMC4yMS01LjM3bC0zLjYsOS4zOWgtMS41MWwtMy41OS05LjM4bDAuMjEsNS4zNnY0LjAyCgkJCWgtMi4xMVYxOS45M0g0NC43eiIvPgoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik01Ni45NiwzMi4xMlYxOS45M2gzLjZjMS4wOCwwLDIuMDMsMC4yNCwyLjg3LDAuNzJjMC44MywwLjQ4LDEuNDgsMS4xNiwxLjk0LDIuMDQKCQkJYzAuNDYsMC44OCwwLjY5LDEuODksMC42OSwzLjAzdjAuNjFjMCwxLjE1LTAuMjMsMi4xNy0wLjY5LDMuMDVjLTAuNDYsMC44OC0xLjEyLDEuNTUtMS45NywyLjAzYy0wLjg1LDAuNDctMS44MywwLjcxLTIuOTIsMC43MQoJCQlINTYuOTZ6IE01OS4wOCwyMS42NHY4Ljc5aDEuMzhjMS4xMSwwLDEuOTYtMC4zNSwyLjU2LTEuMDRjMC41OS0wLjY5LDAuOS0xLjY5LDAuOTEtMi45OXYtMC42OGMwLTEuMzItMC4yOS0yLjMzLTAuODYtMy4wMwoJCQljLTAuNTctMC43LTEuNDEtMS4wNS0yLjUtMS4wNUg1OS4wOHoiLz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNzMuMzgsMzIuMTJjLTAuMDktMC4xNy0wLjE3LTAuNDUtMC4yMy0wLjg1Yy0wLjY1LDAuNjgtMS40NCwxLjAxLTIuMzgsMS4wMWMtMC45MSwwLTEuNjUtMC4yNi0yLjIzLTAuNzgKCQkJYy0wLjU3LTAuNTItMC44Ni0xLjE2LTAuODYtMS45MmMwLTAuOTcsMC4zNi0xLjcxLDEuMDgtMi4yMmMwLjcyLTAuNTIsMS43NC0wLjc3LDMuMDgtMC43N2gxLjI1di0wLjU5CgkJCWMwLTAuNDctMC4xMy0wLjg0LTAuMzktMS4xM2MtMC4yNi0wLjI4LTAuNjYtMC40Mi0xLjItMC40MmMtMC40NiwwLTAuODQsMC4xMi0xLjE0LDAuMzVzLTAuNDQsMC41My0wLjQ0LDAuODhoLTIuMDMKCQkJYzAtMC41LDAuMTYtMC45NiwwLjQ5LTEuMzljMC4zMy0wLjQzLDAuNzgtMC43NywxLjM0LTEuMDJjMC41Ny0wLjI1LDEuMi0wLjM3LDEuOS0wLjM3YzEuMDYsMCwxLjkxLDAuMjcsMi41NCwwLjgKCQkJczAuOTUsMS4yOCwwLjk3LDIuMjV2NC4wOGMwLDAuODEsMC4xMSwxLjQ2LDAuMzQsMS45NXYwLjE0SDczLjM4eiBNNzEuMTQsMzAuNjVjMC40LDAsMC43OC0wLjEsMS4xMy0wLjI5CgkJCWMwLjM1LTAuMiwwLjYyLTAuNDYsMC44LTAuNzl2LTEuNzFoLTEuMWMtMC43NSwwLTEuMzIsMC4xMy0xLjcsMC4zOXMtMC41NywwLjYzLTAuNTcsMS4xMWMwLDAuMzksMC4xMywwLjcsMC4zOSwwLjkzCgkJCVM3MC43MSwzMC42NSw3MS4xNCwzMC42NXoiLz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNzkuNzksMjAuODZ2Mi4yaDEuNnYxLjUxaC0xLjZ2NS4wNWMwLDAuMzUsMC4wNywwLjYsMC4yMSwwLjc1YzAuMTQsMC4xNSwwLjM4LDAuMjMsMC43MywwLjIzCgkJCWMwLjIzLDAsMC40Ny0wLjAzLDAuNzEtMC4wOHYxLjU3Yy0wLjQ2LDAuMTMtMC45MSwwLjE5LTEuMzQsMC4xOWMtMS41NiwwLTIuMzQtMC44Ni0yLjM0LTIuNTl2LTUuMTNoLTEuNDl2LTEuNTFoMS40OXYtMi4ySDc5Ljc5CgkJCXoiLz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNODguMzUsMzIuMTJjLTAuMDktMC4xNy0wLjE3LTAuNDUtMC4yMy0wLjg1Yy0wLjY1LDAuNjgtMS40NCwxLjAxLTIuMzgsMS4wMWMtMC45MSwwLTEuNjUtMC4yNi0yLjIzLTAuNzgKCQkJYy0wLjU3LTAuNTItMC44Ni0xLjE2LTAuODYtMS45MmMwLTAuOTcsMC4zNi0xLjcxLDEuMDgtMi4yMmMwLjcyLTAuNTIsMS43NC0wLjc3LDMuMDgtMC43N2gxLjI1di0wLjU5CgkJCWMwLTAuNDctMC4xMy0wLjg0LTAuMzktMS4xM2MtMC4yNi0wLjI4LTAuNjYtMC40Mi0xLjItMC40MmMtMC40NiwwLTAuODQsMC4xMi0xLjE0LDAuMzVzLTAuNDQsMC41My0wLjQ0LDAuODhoLTIuMDMKCQkJYzAtMC41LDAuMTYtMC45NiwwLjQ5LTEuMzljMC4zMy0wLjQzLDAuNzgtMC43NywxLjM0LTEuMDJjMC41Ny0wLjI1LDEuMi0wLjM3LDEuOS0wLjM3YzEuMDYsMCwxLjkxLDAuMjcsMi41NCwwLjgKCQkJczAuOTUsMS4yOCwwLjk3LDIuMjV2NC4wOGMwLDAuODEsMC4xMSwxLjQ2LDAuMzQsMS45NXYwLjE0SDg4LjM1eiBNODYuMTEsMzAuNjVjMC40LDAsMC43OC0wLjEsMS4xMy0wLjI5CgkJCWMwLjM1LTAuMiwwLjYyLTAuNDYsMC44LTAuNzl2LTEuNzFoLTEuMWMtMC43NSwwLTEuMzIsMC4xMy0xLjcsMC4zOXMtMC41NywwLjYzLTAuNTcsMS4xMWMwLDAuMzksMC4xMywwLjcsMC4zOSwwLjkzCgkJCVM4NS42OCwzMC42NSw4Ni4xMSwzMC42NXoiLz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOTMuNDgsMjkuOTdjMC4zOCwwLDAuNjcsMC4xMSwwLjg4LDAuMzJzMC4zMSwwLjQ4LDAuMzEsMC44MWMwLDAuMzItMC4xLDAuNTgtMC4zMSwwLjc5CgkJCWMtMC4yMSwwLjIxLTAuNSwwLjMxLTAuODgsMC4zMWMtMC4zNiwwLTAuNjUtMC4xLTAuODYtMC4zMWMtMC4yMS0wLjIxLTAuMzItMC40Ny0wLjMyLTAuOGMwLTAuMzIsMC4xLTAuNTksMC4zMS0wLjgxCgkJCUM5Mi44MSwzMC4wOCw5My4xLDI5Ljk3LDkzLjQ4LDI5Ljk3eiIvPgoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05NywyMC43MWMwLTAuMzEsMC4xLTAuNTcsMC4zLTAuNzhjMC4yLTAuMjEsMC40OC0wLjMxLDAuODUtMC4zMWMwLjM3LDAsMC42NSwwLjEsMC44NSwwLjMxCgkJCWMwLjIsMC4yMSwwLjMsMC40NywwLjMsMC43OGMwLDAuMzEtMC4xLDAuNTYtMC4zLDAuNzdjLTAuMiwwLjItMC40OSwwLjMxLTAuODUsMC4zMWMtMC4zNywwLTAuNjUtMC4xLTAuODUtMC4zMQoJCQlDOTcuMSwyMS4yNyw5NywyMS4wMiw5NywyMC43MXogTTk5LjE2LDMyLjEyaC0yLjAzdi05LjA1aDIuMDNWMzIuMTJ6Ii8+CgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEwMC45OSwyNy41MWMwLTAuODksMC4xOC0xLjY5LDAuNTMtMi40YzAuMzUtMC43MSwwLjg1LTEuMjYsMS40OC0xLjY0YzAuNjQtMC4zOCwxLjM3LTAuNTcsMi4xOS0wLjU3CgkJCWMxLjIyLDAsMi4yMSwwLjM5LDIuOTgsMS4xOGMwLjc2LDAuNzksMS4xNywxLjgzLDEuMjMsMy4xM2wwLjAxLDAuNDhjMCwwLjg5LTAuMTcsMS42OS0wLjUxLDIuMzlzLTAuODMsMS4yNS0xLjQ3LDEuNjMKCQkJcy0xLjM4LDAuNTgtMi4yMSwwLjU4Yy0xLjI4LDAtMi4zLTAuNDMtMy4wNy0xLjI4cy0xLjE1LTEuOTgtMS4xNS0zLjRWMjcuNTF6IE0xMDMuMDMsMjcuNjhjMCwwLjkzLDAuMTksMS42NiwwLjU4LDIuMTkKCQkJczAuOTIsMC43OSwxLjYxLDAuNzljMC42OSwwLDEuMjItMC4yNywxLjYtMC44YzAuMzgtMC41NCwwLjU3LTEuMzIsMC41Ny0yLjM1YzAtMC45MS0wLjItMS42NC0wLjU5LTIuMTgKCQkJYy0wLjM5LTAuNTQtMC45My0wLjgtMS42LTAuOGMtMC42NiwwLTEuMTksMC4yNi0xLjU4LDAuNzlDMTAzLjIyLDI1Ljg0LDEwMy4wMywyNi42MywxMDMuMDMsMjcuNjh6Ii8+Cgk8L2c+Cgk8cG9seWdvbiBjbGFzcz0ic3QxIiBwb2ludHM9IjEyLjYyLDE0LjQ3IDEyLjYyLDE1Ljk0IDE3LjM2LDEyLjkyIDE3LjM2LDM4Ljc4IDcuODQsMzguNzggNy44NCwzNi42NSA2LjYsMzYuNjUgNi42LDQwLjAyIAoJCTE4LjYsNDAuMDIgMTguNiwxMC42NiAJIi8+Cgk8cG9seWdvbiBjbGFzcz0ic3QxIiBwb2ludHM9IjIuODUsMTMuOTMgMi44NSwyMC43MSA0LjA5LDE5LjkxIDQuMDksMTkuOTEgNC4wOSwxNC43OCA0LjA5LDE0LjYxIDExLjM4LDkuOTUgMTEuMzgsMTQuNzggCgkJMTEuMzgsMTUuMjYgMTEuMzgsMTUuMjYgMTIuNjIsMTQuNDcgMTIuNjIsNy42OSAJIi8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMC44MiwyMnYxNC42NWgxMS44VjE0LjQ3TDAuODIsMjJ6IE0xMS4zOCwzNS40SDIuMDZWMjIuNjhsOS4zMi01Ljk0VjM1LjR6Ii8+CjwvZz4KPGc+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNjYuMDUsMzUuMDVjMC41My0wLjEsMS4yNi0wLjE3LDIuMjYtMC4xN2MxLjA4LDAsMS44NywwLjIzLDIuMzksMC42NmMwLjQ4LDAuNCwwLjc5LDEuMDMsMC43OSwxLjc5CgkJYzAsMC43Ny0wLjI0LDEuNDEtMC43LDEuODRjLTAuNTksMC41OS0xLjUxLDAuODYtMi41NiwwLjg2Yy0wLjI4LDAtMC41My0wLjAxLTAuNzItMC4wNXYzLjA1aC0xLjQ3VjM1LjA1eiBNNjcuNTIsMzguODMKCQljMC4xOCwwLjA1LDAuNDIsMC4wNiwwLjcyLDAuMDZjMS4xMSwwLDEuNzgtMC41NCwxLjc4LTEuNDljMC0wLjktMC42My0xLjM4LTEuNjUtMS4zOGMtMC40MSwwLTAuNywwLjA0LTAuODUsMC4wN1YzOC44M3oiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03Mi42OCwzNC41MWgxLjQ5djguNTNoLTEuNDlWMzQuNTF6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNzkuMDYsNDMuMDRsLTAuMS0wLjY1aC0wLjA0Yy0wLjM2LDAuNDYtMC45NywwLjc4LTEuNzMsMC43OGMtMS4xOCwwLTEuODQtMC44NS0xLjg0LTEuNzQKCQljMC0xLjQ4LDEuMzEtMi4yMiwzLjQ3LTIuMjF2LTAuMWMwLTAuMzgtMC4xNi0xLjAyLTEuMTktMS4wMmMtMC41OCwwLTEuMTgsMC4xOC0xLjU3LDAuNDNsLTAuMjktMC45NgoJCWMwLjQzLTAuMjYsMS4xOS0wLjUyLDIuMTEtMC41MmMxLjg3LDAsMi40MiwxLjE5LDIuNDIsMi40NnYyLjExYzAsMC41MywwLjAyLDEuMDUsMC4wOCwxLjQxSDc5LjA2eiBNNzguODcsNDAuMTgKCQljLTEuMDQtMC4wMi0yLjA0LDAuMi0yLjA0LDEuMDljMCwwLjU4LDAuMzcsMC44NCwwLjg0LDAuODRjMC41OSwwLDEuMDItMC4zOCwxLjE1LTAuODFjMC4wNC0wLjExLDAuMDUtMC4yMywwLjA1LTAuMzJWNDAuMTh6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNODMuNSwzNS41MnYxLjY3aDEuNDF2MS4xMUg4My41djIuNThjMCwwLjcxLDAuMTksMS4wOCwwLjc2LDEuMDhjMC4yNSwwLDAuNDQtMC4wNCwwLjU4LTAuMDdsMC4wMiwxLjEzCgkJYy0wLjIyLDAuMDgtMC42LDAuMTQtMS4wNywwLjE0Yy0wLjU0LDAtMS0wLjE4LTEuMjctMC40OGMtMC4zMS0wLjM0LTAuNDYtMC44Ni0wLjQ2LTEuNjNWMzguM2gtMC44NHYtMS4xMWgwLjg0di0xLjMyTDgzLjUsMzUuNTJ6CgkJIi8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNODYuMTksNDMuMDRWMzguM0g4NS40di0xLjExaDAuNzl2LTAuMjVjMC0wLjc2LDAuMi0xLjUxLDAuNzEtMS45OWMwLjQzLTAuNDEsMS4wMi0wLjU3LDEuNTMtMC41NwoJCWMwLjQsMCwwLjcxLDAuMDYsMC45NSwwLjE0bC0wLjExLDEuMTRjLTAuMTYtMC4wNi0wLjM2LTAuMTEtMC42My0wLjExYy0wLjczLDAtMC45OSwwLjYxLTAuOTksMS4zM3YwLjNoMS4yOXYxLjExaC0xLjI3djQuNzUKCQlIODYuMTl6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNOTUuMjksNDAuMDZjMCwyLjE1LTEuNTEsMy4xMS0zLDMuMTFjLTEuNjYsMC0yLjkzLTEuMTQtMi45My0zLjAyYzAtMS45MiwxLjI2LTMuMSwzLjAzLTMuMQoJCUM5NC4xMiwzNy4wNiw5NS4yOSwzOC4yOSw5NS4yOSw0MC4wNnogTTkwLjg4LDQwLjEyYzAsMS4xMywwLjU1LDEuOTgsMS40NSwxLjk4YzAuODQsMCwxLjQzLTAuODMsMS40My0yLjAxCgkJYzAtMC45MS0wLjQxLTEuOTYtMS40Mi0xLjk2QzkxLjMsMzguMTQsOTAuODgsMzkuMTUsOTAuODgsNDAuMTJ6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNOTYuNTEsMzkuMDhjMC0wLjc5LTAuMDEtMS4zNi0wLjA1LTEuODloMS4yOWwwLjA1LDEuMTJoMC4wNWMwLjI5LTAuODMsMC45Ny0xLjI1LDEuNi0xLjI1CgkJYzAuMTQsMCwwLjIzLDAuMDEsMC4zNSwwLjA0djEuMzljLTAuMTItMC4wMi0wLjI1LTAuMDUtMC40My0wLjA1Yy0wLjcxLDAtMS4xOSwwLjQ2LTEuMzIsMS4xMmMtMC4wMiwwLjEzLTAuMDUsMC4yOS0wLjA1LDAuNDYKCQl2My4wM2gtMS40OFYzOS4wOHoiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMDAuNzgsMzguOTRjMC0wLjY3LTAuMDEtMS4yNC0wLjA1LTEuNzRoMS4yN2wwLjA2LDAuODdoMC4wNGMwLjI5LTAuNDYsMC44Mi0xLDEuOC0xCgkJYzAuNzcsMCwxLjM3LDAuNDMsMS42MiwxLjA4aDAuMDJjMC4yLTAuMzIsMC40NS0wLjU3LDAuNzItMC43M2MwLjMyLTAuMjMsMC43LTAuMzUsMS4xOC0wLjM1YzAuOTcsMCwxLjk2LDAuNjYsMS45NiwyLjU0djMuNDUKCQloLTEuNDR2LTMuMjNjMC0wLjk3LTAuMzQtMS41NS0xLjA1LTEuNTVjLTAuNSwwLTAuODgsMC4zNi0xLjAzLDAuNzhjLTAuMDQsMC4xNC0wLjA3LDAuMzItMC4wNywwLjQ5djMuNTFoLTEuNDR2LTMuMzkKCQljMC0wLjgyLTAuMzItMS4zOS0xLjAxLTEuMzljLTAuNTUsMC0wLjkzLDAuNDMtMS4wNiwwLjg0Yy0wLjA2LDAuMTQtMC4wOCwwLjMxLTAuMDgsMC40OHYzLjQ2aC0xLjQ0VjM4Ljk0eiIvPgo8L2c+Cjwvc3ZnPgo=" alt="" class="img-fluid d-none">
                    </div>
                    <div v-on-clickaway="closeUpdate"
                         class="card-bd__title"
                         :class="{'card-bd__title--edit-mode': editMode}">
                        <div v-show="!editMode"
                             @click="switchToEditMode">
                            {{ cloud.name }}
                        </div>
                        <div class="card-bd__text-container" v-show="editMode">
                            <input ref="updateInput"
                                   type="text"
                                   v-model="newName"
                                   @keyup.enter="submitUpdate"
                                   :placeholder="cloud.name"/>
                        </div>
                    </div>
                    <div class="card-bd__infos-cloud" v-if="isAdmin">
                      <span class="card-bd__infos-cloud__projects">
                        <svgicon name="application" height="30" width="30"></svgicon>
                        +0
                      </span>
                      <span class="card-bd__infos-cloud__users">
                        +0
                        <svgicon name="account" height="30" width="30"></svgicon>
                      </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import _ from 'lodash'
import { mixin as clickaway } from 'vue-clickaway'
import BaseButtonOption from '@/components/base-components/BaseButtonOption'

export default {
  data () {
    return {
      clicked: false,
      displayMenu: false,
      editMode: false,
      newName: '',
      showRemoveActions: false,
      isAdmin: true
    }
  },
  components: {
    BaseButtonOption
  },
  mixins: [ clickaway ],
  props: {
    cloud: {
      type: Object,
      required: true
    }
  },
  methods: {
    accessCloud () {
      this.$store.commit('SET_CURRENT_CLOUD', this.cloud)
      this.$router.push({name: 'project-list'})
    },
    switchToEditMode () {
      this.editMode = true
      this.$nextTick(function () {
        this.$refs.updateInput.focus()
      })
    },
    remove () {
      this.displayLoader = true
      this.$store.dispatch('removeProject', this.project).then(() => {})
    },
    toggleMenu (isOpened) {
      if (!isOpened) {
        this.showRemoveActions = false
      }
    },
    closeTool () {
      this.displayMenu = false
    },
    closeUpdate () {
      this.editMode = false
    },
    submitUpdate () {
      if (this.newName === '' || this.newName === this.cloud.name) {
        this.newName = ''
        this.editMode = false
      } else {
        this.update(this.newName).then(() => {
          this.newName = ''
          this.editMode = false
        })
      }
    },
    async update (name) {
      let cloud = _.cloneDeep(this.cloud)
      cloud.name = name
      this.$store.dispatch('updateCloud', cloud).then(() => {
        return true
      })
    },
    clickedTool () {
      this.displayMenu = !this.displayMenu
      this.clicked = false
      this.clicked = true
      setTimeout(() => {
        this.clicked = false
      }, 500)
    }
  }
}
</script>
