!function () {
    var commonFormatterData = {
        dc: '医护',
        pa: '患者',
        0: '正常',
        1: '一级异常',
        2: '二级异常',
        3: '三级异常',
    }
    var subjectCodeData = {
        '110101': '服务费',
        '110102': '备品费',
        '110103': '代金券',

        '21010201': '医护订单收入',
        '21010202': '医护提现/医院代提现',
        '21010203': '医护扣款',
        '21010204': '医护备品收入',

        '600101': '平台订单分润收入',
        '600102': '医护退单收入',
        '600103': '患者责任收入',
        '21010101': '医院订单分润收入',
        '21010102': '医院提现',
    }
    var qsGrid = {
        commonFormatter: function (cellValue, options, rowObject) {
            if (commonFormatterData[cellValue]) {
                return commonFormatterData[cellValue]
            } else {
                return ''
            }
        },
        commonFormatterUrl: function (cellValue, options, rowObject) {
            if (commonFormatterData[cellValue]) {
                return commonFormatterData[cellValue]
            } else {
                return ''
            }
        },
        authFormatter: function (cellValue, options, rowObject) {
            if (cellValue == '0') {
                return '失效'
            } else if (cellValue == '1') {
                return '生效'
            }
        },
        genderFormatter: function (cellValue, options, rowObject) {
            if (cellValue == '0') {
                return '男'
            } else if (cellValue == '1') {
                return '女'
            }
        },
        priceFormatter: function (cellValue, options, rowObject) {
            return cellValue ? cellValue / 100 : 0;
        },
        targetFormatter: function (cellValue, options, rowObject) {
            if (cellValue == 'all') {
                return '医护和患者'
            } else if (cellValue == 'doc') {
                return '医护'
            }
            else {
                return '患者'
            }
        },
        opentypeFormatter: function (cellValue, options, rowObject) {
            if (cellValue == '1') {
                return '更改状态'
            } else if (cellValue == '2') {
                return '弹出div'
            }
            else if (cellValue == '3') {
                return '本地链接'
            }
            else {
                return '远程连接'
            }
        },
        msgtypeFormatter: function (cellValue, options, rowObject) {
            if (cellValue == 'sm') {
                return '系统消息'
            } else if (cellValue == 'bm') {
                return '业务消息'
            }
        },
        levelFormatter: function (cellValue, options, rowObject) {
            if (cellValue == '0') {
                return '文件夹'
            } else if (cellValue == '1') {
                return '菜单'
            } else {
                return '功能'
            }
        },
        subjectCodeFormatter: function (cellValue, options, rowObject) {
            if (subjectCodeData[cellValue]) {
                return cellValue + "-" + subjectCodeData[cellValue]
            } else {
                return cellValue
            }
        },
        lendingFormatter: function (cellValue, options, rowObject) {
            if (cellValue == 'C') {
                return 'C-贷'
            } else if (cellValue == 'D') {
                return 'D-借'
            } else {
                return '无'
            }
        },
        channelFormatter: function (cellValue, options, rowObject) {
            if (cellValue == 'WX-APP') {
                return 'WX-APP-微信'
            } else {
                return cellValue
            }
        },

        amountFormatter: function (cellValue, options, rowObject) {
            return parseInt(cellValue) / 100;
        },

        amountDateFormatter: function (cellValue, options, rowObject) {
            if (cellValue) {
                return moment(cellValue).format('YYYY-MM-DD HH:mm:ss');
            } else {
                return ""
            }
        },

        dateFormatter: function (cellValue, options, rowObject) {
            if (cellValue) {
                return moment(cellValue).format('YYYY-MM-DD');
            } else {
                return ""
            }
        },

        changeValue(gridId, event, rowId) {
            var timestamp = Date.parse(new Date());
            $("#" + gridId + "RowInput").update(gridId + "&&" + event + "&&" + rowId + "&&" + timestamp);

        },
        changeValueWarning(gridId, event, rowId) {
            layer.confirm('是否确认此操作？', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                var timestamp = Date.parse(new Date());
                $("#" + gridId + "RowInput").update(gridId + "&&" + event + "&&" + rowId + "&&" + timestamp);
                layer.msg('操作成功');
            }, function () {
                layer.msg("操作取消");
            });
        },


        fdtPatientNodeFormatter: function (cellValue, options, rowObject) {
            if (cellValue == 'WFP') {
                return '未分配'
            } else if (cellValue == 'YFP') {
                return '已分配'
            } else if (cellValue == 'WQ') {
                return '未签'
            } else if (cellValue == 'YQ') {
                return '已签'
            } else if (cellValue == 'JQ') {
                return '拒签'
            }
        },

        doctorTypeFormatter: function (cellValue, options, rowObject) {
            if (cellValue == 'doctor') {
                return '医生'
            } else if (cellValue == 'nurse') {
                return '护士'
            }
        },

        fdtcreaterFormatter: function (cellValue, options, rowObject) {
            if (cellValue == '1') {
                return '可以'
            } else if (cellValue == '2') {
                return '不可以'
            } else {
                return '不可以'
            }
        },


        fileChange: function (gridId, event, rowId, id) {
            var timestamp = Date.parse(new Date());
            $("#" + gridId + "RowInput").update(gridId + "&&" + event + "&&" + rowId + "&&" + id + "&&" + timestamp);
        },

        loadFlagFormatter: function (cellValue, options, rowObject) {
            if (cellValue == '0') {
                return '启动加载'
            } else if (cellValue == '1') {
                return '启动不加载'
            } else {
                return cellValue;
            }
        },
        settingtypeFormatter: function (cellValue, options, rowObject) {
            if (cellValue == 'sh') {
                return '定时任务'
            } else if (cellValue == 'ot') {
                return '其他'
            } else {
                return cellValue;
            }
        },
        autoRunFormatter: function (cellValue, options, rowObject) {
            if (cellValue == '0') {
                return '自动运行'
            } else if (cellValue == '1') {
                return '手动运行'
            } else {
                return cellValue;
            }
        },
        runFlagFormatter: function (cellValue, options, rowObject) {
            if (cellValue == '0') {
                return '<span style="color: green;"><i class="fa fa-play"></i></span> 运行'
            } else if (cellValue == '1') {
                return '<span style="color: red;"><i class="fa fa-stop"></i></span> 停止'
            } else {
                return cellValue;
            }
        },


        isArray: function isArray(object) {
            return object && typeof object === 'object' &&
                typeof object.length === 'number' &&
                typeof object.splice === 'function' &&
                //判断length属性是否是可枚举的 对于数组 将得到false
                !(object.propertyIsEnumerable('length'));
        },

        getOneBtnStr: function (op) {
            const clazz = op.clazz ? op.clazz : 'btn-warning'
            const rowid = op.rowid ? op.rowid : ''
            const method = op.method ? op.method : ''
            const extend = op.extend ? op.extend : ''
            const icon = op.icon ? op.icon : 'fa-rotate-right'
            const name = op.name ? op.name : '按钮'
            return '<button class="btn btn-sm '
                + clazz + '" ng-grid-rowid="'
                + rowid + '" ng-grid-extend="'
                + extend + '" ng-grid-method="'
                + method + '" type="button" ><i class="fa '
                + icon + '"></i> '
                + name + '</button>'
        },

        getBtnStr: function (op) {
            const that = this;
            if (that.isArray(op)) {
                let str = ''
                for (let oop of op) {
                    str = str + that.getOneBtnStr(oop)
                }
                return str
            } else {
                return that.getOneBtnStr(op)
            }
        },


        dateDataInit: function (element) {
            $(element).datepicker({
                dateFormat: "yy-mm-dd",
                monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
                onSelect: function (dateText, inst) {
                    inst.input.focus();
                }
            });
        },

        testConsole() {
            console.log("testConsole")
        }
    };

    this.qsGrid = qsGrid;
}();

(function ($) {
    $.fn.update = function (value) {
        $(this).each(function () {
            if (value != this.value) {
                this.value = value;
                if (/msie/i.test(navigator.userAgent)) { //IE
                    this.fireEvent("change");
                } else {
                    var e = document.createEvent('MouseEvent');
                    e.initEvent('change', false, false);
                    this.dispatchEvent(e);
                }
            }
        });
    };
})(jQuery);
