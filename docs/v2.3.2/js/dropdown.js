/* ============================================================
 * bootstrap-dropdown.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

    "use strict"; // jshint ;_;


    /* DROPDOWN CLASS DEFINITION
     * ========================= */

    var toggle = '[data-toggle=dropdown]'
        , Dropdown = function (element) {
            var $el = $(element).on('click.dropdown.data-api', this.toggle)
            $('html').on('click.dropdown.data-api', function () {
                $el.parent().removeClass('open')
            });
        }

    Dropdown.prototype = {

        constructor: Dropdown, toggle: function (e) {
            var $this = $(this)
                , $parent
                , isActive

            if ($this.is('.disabled, :disabled')) return

            $parent = getParent($this)

            isActive = $parent.hasClass('open')

            clearMenus()

            if (!isActive) {
                $parent.toggleClass('open')
                positioning($parent.find('.dropdown-menu'), $this)
            }

            $this.focus()

            return false
        }
        , change: function (e) {

            var
                $parent,
                $menu,
                $toggle,
                selector,
                text = '',
                $items;

            $menu = $(this).closest('.dropdown-menu');

            $toggle = $menu.parent().find('[data-label-placement]');

            if (!$toggle || !$toggle.length) {
                $toggle = $menu.parent().find(toggle);
            }

            if (!$toggle || !$toggle.length || $toggle.data('placeholder') === false)
                return; // do nothing, no control

            ($toggle.data('placeholder') == undefined && $toggle.data('placeholder', $.trim($toggle.text())));
            text = $.data($toggle[0], 'placeholder');

            $items = $menu.find('li > input:checked');

            if ($items.length) {
                text = [];
                $items.each(function () {
                    var str = $(this).parent().find('label').eq(0),
                        label = str.find('.data-label');

                    if (label.length) {
                        var p = $('<p></p>');
                        p.append(label.clone());
                        str = p.html();
                    }
                    else {
                        str = str.html();
                    }


                    str && text.push($.trim(str));
                });

                text = text.length < 4 ? text.join(', ') : text.length + ' selected';
            }

            var caret = $toggle.find('.caret');

            $toggle.html(text || '&nbsp;');
            if (caret.length)
                $toggle.append(' ') && caret.appendTo($toggle);

        }
        , keydown: function (e) {
            var $this
                , $items
                , $active
                , $parent
                , isActive
                , index

            if (!/(38|40|27)/.test(e.keyCode)) return

            $this = $(this)

            e.preventDefault()
            e.stopPropagation()

            if ($this.is('.disabled, :disabled')) return

            $parent = getParent($this)

            isActive = $parent.hasClass('open')

            if (!isActive || (isActive && e.keyCode == 27)) {
                if (e.which == 27) $parent.find(toggle).focus()
                return $this.click()
            }

            $items = $('[role=menu] li:not(.divider):visible a, li:not(.divider):visible > input:not(disabled) ~ label', $parent)

            if (!$items.length) return

            index = $items.index($items.filter(':focus'))

            if (e.keyCode == 38 && index > 0) index--                                        // up
            if (e.keyCode == 40 && index < $items.length - 1) index++                        // down

            if (!~index) index = 0

            $items
                .eq(index)
                .focus()
        }

    }

    function positioning($menu, $control) {
        if ($menu.hasClass('pull-center')) {
            $menu.css('margin-right', $menu.outerWidth() / -2);
        }

        if ($menu.hasClass('pull-middle')) {
            $menu.css('margin-top', ($menu.outerHeight() / -2) - ($control.outerHeight() / 2));
        }
    }

    function clearMenus() {
        $(toggle).each(function () {
            getParent($(this)).removeClass('open')
        })
    }

    function getParent($this) {
        var selector = $this.attr('data-target')
            , $parent

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
        }

        $parent = selector && $(selector)

        if (!$parent || !$parent.length) $parent = $this.parent()

        return $parent
    }


    /* DROPDOWN PLUGIN DEFINITION
     * ========================== */

    var old = $.fn.dropdown

    $.fn.dropdown = function (option) {
        return this.each(function () {
            var $this = $(this)
                , data = $this.data('dropdown')
            if (!data) $this.data('dropdown', (data = new Dropdown(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }

    $.fn.dropdown.Constructor = Dropdown


    /* DROPDOWN NO CONFLICT
     * ==================== */

    $.fn.dropdown.noConflict = function () {
        $.fn.dropdown = old
        return this
    }


    /* APPLY TO STANDARD DROPDOWN ELEMENTS
     * =================================== */

    $(document)
        .on('click.dropdown.data-api', clearMenus)
        .on('click.dropdown.data-api', '.dropdown form', function (e) {
            e.stopPropagation()
        })
        .on('click.dropdown-menu', function (e) {
            e.stopPropagation()
        })
        .on('click.dropdown-menu', '.dropdown-menu > li > input[type="checkbox"] ~ label, .dropdown-menu > li > input[type="checkbox"], .dropdown-menu.noclose > li', function (e) {
            e.stopPropagation()
        })
        .on('change.dropdown-menu', '.dropdown-menu > li > input[type="checkbox"], .dropdown-menu > li > input[type="radio"]', Dropdown.prototype.change)
        .on('click.dropdown.data-api', toggle, Dropdown.prototype.toggle)
        .on('keydown.dropdown.data-api', toggle + ', [role=menu]', Dropdown.prototype.keydown)

}(window.jQuery);
