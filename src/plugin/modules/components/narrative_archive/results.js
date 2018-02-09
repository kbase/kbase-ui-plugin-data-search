define([
    'knockout-plus',
    'kb_common/html',
    '../dialogs/duplicateNarrative',
    '../dialogs/copyObjects',
    '../../lib/heightMonitor',
    '../../lib/elementMonitor',
    'css!./results.css'
], function (
    ko,
    html,
    DuplicateNarrativeComponent,
    CopyObjectComponent,
    HeightMonitor,
    ElementMonitor
) {
    'use strict';

    var t = html.tag,
        button = t('button'),
        div = t('div'),
        span = t('span'),
        input = t('input'),
        a = t('a'),
        table = t('table'),
        tbody = t('tbody'),
        tr = t('tr'),
        td = t('td');

    var styles = html.makeStyles({
        scrollButton: {
            css: {
                flex: '0 0 25px',
                textAlign: 'center'
            },
            pseudo: {
                hover: {
                    backgroundColor: 'silver'
                },
                active: {
                    backgroundColor: 'gray',
                    color: 'white'
                }
            }
        }
    });

    function viewModel(params, componentInfo) {
        // var showSummary = ko.observable();
        // var showMatches = ko.observable();
        // var showDetail = ko.observable();
        var view = ko.pureComputed(function () {
            switch (params.view()) {
            case 'list':
                return {
                    summary: true,
                    matches: false,
                    detail: false
                };
            case 'matches': 
                return {
                    summary: false,
                    matches: true,
                    detail: false
                };
            case 'detail':
                return {
                    summary: false,
                    matches: false,
                    detail: true
                };
            }
        });


        // If this is not an Element, it was installed with a comment and 
        // the first node in the template can be found as the next sibling.
        var mainElement;
        if (componentInfo.element.querySelector) {
            mainElement = componentInfo.element;
        } else {
            mainElement = componentInfo.element.nextSibling;
        }
        var resultRowsContainerElement = mainElement.querySelector('[name="result-rows-container"]');
        var resultRowsElement =mainElement.querySelector('[name="result-rows"]');

        // var availableHeight = ko.observable();
       
        // var resultsHeight = ko.observable();
        

        var pageSize = ko.observable(20);
        var currentItem = ko.observable(1);


        var scroller = {
            height: 15,
            top: 100,
            map: {
                before: ko.observable(),
                current: ko.observable(),
                after: ko.observable()
            },
            buffer: {
                before: ko.observable(),
                current: ko.observable(),
                after: ko.observable()
            }
        };

        var searchState = params.searchState;

        searchState.status.subscribe(function (newValue) {
            console.log('status', newValue);
        });

        

        // function updateScroller() {
        //     // we need...
        //     // total # of results
        //     // are results truncated?
        //     // total # of results in current fetch group (results)
        //     // size of current fetch group (buffer)
        //     // size of container
        //     // top of displayed area (relative to the top of the buffer)

        //     // search results
        //     var totalResultCount = searchState.totalResultCount();
        //     var isTruncated = searchState.isTruncated();
        //     var first = searchState.firstItemPosition();
        //     var bufferSize = searchState.buffer().length;
            
        //     // ui measurements 
        //     bufferHeight = resultsHeight();
        //     var containerHeight = availableHeight();
        //     var bufferTop = resultRowsContainerElement.scrollTop;

        //     // scroller.map.before(first / totalResultCount);
        //     // scroller.map.current(bufferSize / totalResultCount);
        //     // scroller.map.after((totalResultCount - (first + bufferSize)) / totalResultCount);
        //     // console.log('scroller', scroller.map.before(), scroller.map.current(), scroller.map.after());

        //     scroller.buffer.before( bufferTop / bufferHeight);
        //     scroller.buffer.current(containerHeight / bufferHeight);
        //     scroller.buffer.after( (bufferHeight - (bufferTop + containerHeight)) / bufferHeight);
        //     // console.log('buffer scroller', bufferHeight, containerHeight, bufferTop);
        // }

        scroller.map.before = ko.pureComputed(function () {
            var first = searchState.firstItemPosition();
            var total = searchState.totalResultCount();
            if (total > 0) {
                return first/total;
            }
        });

        scroller.map.current = ko.pureComputed(function () {
            var size = searchState.buffer().length;
            var total = searchState.totalResultCount();
            if (total > 0) {
                return size /  total;
            }
        });

        scroller.map.after = ko.pureComputed(function () {
            var first = searchState.firstItemPosition();
            var total = searchState.totalResultCount(); 
            var size = searchState.buffer().length;
            if (total > 0) {
                return (total - (first + size)) / total;
            }
        });

        // observable measures of the buffer area ...
        var bufferTop = ko.observable();
        var bufferHeight = ko.observable();
        var bufferContainerHeight = ko.observable();

        // TODO: break this into detectors for each measure.
        // function updateBufferMetrics() {
        //     // bufferHeight(resultsHeight());
        //     bufferTop(resultRowsContainerElement.scrollTop);
        //     // bufferContainerHeight(availableHeight());
        // }

        scroller.buffer.before = ko.pureComputed(function () {
            var top = bufferTop();
            var height = bufferHeight();
            if (typeof height !== 'number' || height <= 0) {
                return;
            }
            return (top / height);
        });

        scroller.buffer.current = ko.pureComputed(function () {
            var height = bufferHeight();
            var visibleHeight = bufferContainerHeight();
            if (typeof height !== 'number' || height <= 0) {
                return;
            }
            return (visibleHeight / height);
        });

        scroller.buffer.after = ko.pureComputed(function () {
            var top = bufferTop();
            var height = bufferHeight();
            var visibleHeight = bufferContainerHeight(); 
            if (typeof height !== 'number' || height <= 0) {
                return;
            }
            return ((height - (top + visibleHeight)) / height);
        });

       

        // resultsHeight.subscribe(function (newValue) {
        //     // console.log('new results height: ', newValue);
        //     updateScroller();
        // });
        // availableHeight.subscribe(function (newValue) {
        //     // console.log('new height: ', newValue);
        //     updateScroller();
        // });



        // var actualHeight = resultRowsElement.scrollHeight;

        // console.log('heights', availableHeight, actualHeight);

        

        var heightMonitor = HeightMonitor({
            element: resultRowsContainerElement, 
            onUpdate: function (height) {
                console.log('new height...', height);
                bufferContainerHeight(height);
                // updateScroller();
            },
            rateLimit: 100
        });
        heightMonitor.start();

        // monitor the rows total height. 

        var resultsHeightMonitor = ElementMonitor({
            interval: 50,
            element: resultRowsElement,
            getValue: function (el) {
                return el.scrollHeight;
            },
            onUpdate: function (newHeight) {
                console.log('new buffer height', newHeight);
                bufferHeight(newHeight);
            }
        });
        resultsHeightMonitor.start();


        // ACTIONS

        function doDuplicateNarrative() {
            params.overlayComponent({
                name: DuplicateNarrativeComponent.name(),
                params: {},
                viewModel: {}
            });
        }

        function doCopyObject(data) {
            params.overlayComponent({
                name: CopyObjectComponent.name(),
                viewModel: {
                    ref: data.matchClass.ref
                }
            });
        }

       

        // keeps scrolling until it is turned off!
        function Downer (params) {
            var isDown = false;
            var timer;
            var whileDown = params.whileDown;
            var interval = params.interval || 50;

            function doWhileDown(iters) {
                whileDown(iters);
            }

            function loop(iters) {
                // console.log(iters);
                iters = iters || 0;
                // timer = window.setTimeout(function() {
                //     timer = null;
                //     if (goingUp) {
                //         whileDown();
                //         start();
                //     }
                // },  interval);
                window.requestAnimationFrame(function () {
                    if (isDown) {
                        doWhileDown(iters);
                        loop(iters + 1);
                    }
                });
            }

            function start() {
                doWhileDown(0);
                isDown = true;
                loop(1);
            }

            function stop() {
                isDown = false;
                if (timer) {
                    window.clearTimeout(timer);
                }
            }

            return {
                start: start,
                stop: stop
            };
        }
        
        var bufferUpper = Downer({
            interval: 20,
            whileDown: function (times) {
                var jump = times / 10 + 1;
                resultRowsContainerElement.scrollTop = resultRowsContainerElement.scrollTop + jump;
                bufferTop(resultRowsContainerElement.scrollTop);
            }
        });
        function doScrollUpMouseDown() {
            bufferUpper.start();
        }
        function doScrollUpMouseUp() {
            bufferUpper.stop();
        }

        var bufferDowner = Downer({
            interval: 20,
            whileDown: function (times) {
                var jump = times / 10 + 1;
                resultRowsContainerElement.scrollTop = resultRowsContainerElement.scrollTop - jump;
                bufferTop(resultRowsContainerElement.scrollTop);
            }
        });
        function doScrollDownMouseDown() {
            bufferDowner.start();
        }
        function doScrollDownMouseUp() {
            bufferDowner.stop();
        }

        function doNextPage() {
            
            params.doNextPage();
        }

        function doPreviousPage() {
            params.doPreviousPage();
        }

        function doToggleSelected(data) {
            console.log(data);
            data.selected(data.selected() ? false : true);
            // var selectedObjects = params.selectedObjects
            if (params.selectedObjects().indexOf(data.matchClass.ref.ref) >= 0) {
                params.selectedObjects.remove(data.matchClass.ref.ref);
            } else {
                params.selectedObjects.push(data.matchClass.ref.ref);
            }
        }

        // LIFECYCLE

        // updateScroller();

        function dispose() {
            if (heightMonitor) {
                heightMonitor.stop();
            }
            if (resultsHeightMonitor) {
                resultsHeightMonitor.stop();
            }
        }

        function descendantsComplete() {
            console.log('completed?');
            // updateScroller();
        }

        return {
            searchState: searchState,
            view: view,

            scroller: scroller,

            // ACTIONS
            doDuplicateNarrative: doDuplicateNarrative,
            doCopyObject: doCopyObject,
            doScrollUpMouseDown: doScrollUpMouseDown,
            doScrollUpMouseUp: doScrollUpMouseUp,
            doScrollDownMouseDown: doScrollDownMouseDown,
            doScrollDownMouseUp: doScrollDownMouseUp,

            doNextPage: doNextPage,
            doPreviousPage: doPreviousPage,

            doToggleSelected: doToggleSelected,

            // LIFECYCLE
            dispose: dispose,
            koDescendantsComplete: descendantsComplete
        };
    }

    function buildNarrativeRow() {
        return  div({
            style: {
                // border: '2px solid blue',
                backgroundColor: 'rgba(200,200,200,0.5)',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
                // padding: '10px'
            }
        }, [
            // columns
            div({
                style: {
                    flex: '5'
                }
            }, a({
                dataBind: {
                    attr: {
                        href: '"/narrative/ws." + ref.workspaceId + ".obj." + ref.objectId'                        
                    },
                    text: 'title'
                },
                target: '_blank'
            })),
            div({
                style: {
                    flex: '1'
                }
            }, a({
                dataBind: {
                    attr: {
                        href: '"#people/" + owner.username'
                    },
                    text: 'owner.realName'
                }
            })),
            div({
                style: {
                    flex: '1.5'
                },
                dataBind: {
                    typedText: {
                        type: '"date"',
                        format: '"MM/DD/YYYY"',
                        value: 'modified'
                    }
                }
            }),
            div({
                style: {
                    flex: '1'
                },
               
            }, button({
                class: 'btn btn-default',
                dataBind: {
                    click: '$component.doDuplicateNarrative'
                }
            }, 'Duplicate...'))
        ]);
    }

    function buildSummaryView() {
        return div({
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'row',
                // border: '1px solid green',
                marginBottom: '10px',
                backgroundColor: 'rgba(200,200,200,0.5)'
            }
        }, [
           
            div({
                style: {
                    flex: '7.5'
                    // border: '1px dashed silver'
                }
            }, div({
                style: {
                    fontStyle: 'italic',
                    display: 'inline-block'
                }
            }, [
                '<!-- ko foreach: summary -->',
                'Matched on ',
                span({
                    dataBind: {
                        text: 'count'
                    }
                }), 
                ' ',
                span({
                    dataBind: {
                        labelText: {
                            label: 'id',
                            quantity: 'count',
                            labels: '$root.labels'
                        }
                    }
                }),
                '<!-- ko if: $index() !== $parent.summary.length - 1 -->',
                ', ',
                '<!-- /ko -->',

                '<!-- /ko -->'
            ])),
            div({
                style: {
                    flex: '1',
                    // border: '1px dashed silver'
                }
            }, '')
        ]);
    }

    function buildObjectButton() {
        return [
            '<!-- ko switch: matchClass.id -->',

            // '<!-- ko case: "narrative" -->',
            // button({
            //     class: 'btn btn-default'                
            // }, 'Duplicate...'),
            // '<!-- /ko -->',

            '<!-- ko case: "dataObject" -->',
            '<!-- ko if: matchClass.copyable -->',
            button({
                class: 'btn btn-default',
                dataBind: {
                    click: '$component.doCopyObject'
                }                
            }, 'Copy...'),
            '<!-- /ko -->',
            '<!-- /ko -->',

            '<!-- /ko -->'
        ];
    }

    function buildObjectCheckbox() {
        return [
            '<!-- ko switch: matchClass.id -->',

            // '<!-- ko case: "narrative" -->',
            // button({
            //     class: 'btn btn-default'                
            // }, 'Duplicate...'),
            // '<!-- /ko -->',

            '<!-- ko case: "dataObject" -->',
            '<!-- ko if: matchClass.copyable -->',

            '<!-- ko if: selected() -->',
            span({
                class: 'fa fa-check-square-o',
                style: {
                    fontSize: '120%',
                },
                dataBind: {
                    click: '$component.doToggleSelected'
                }
            }),
            '<!-- /ko -->',

            '<!-- ko ifnot: selected() -->',
            span({
                class: 'fa fa-square-o',
                style: {
                    fontSize: '120%',
                },
                dataBind: {
                    click: '$component.doToggleSelected'
                }
            }),
            '<!-- /ko -->',

            '<!-- /ko -->',
            '<!-- /ko -->',

            '<!-- /ko -->'
        ];
    }
    
    function buildObjectLink() {
        return [
            '<!-- ko switch: matchClass.id -->',

            '<!-- ko case: "narrative" -->',
            a({
                dataBind: {
                    attr: {
                        href: '"/narrative/ws." + matchClass.ref.workspaceId + "." + matchClass.ref.objectId'
                    },
                    text: 'title'
                }
            }),
            '<!-- /ko -->',

            '<!-- ko case: "dataObject" -->',
            '<!-- ko if: matchClass.viewable -->',
            a({
                dataBind: {
                    attr: {
                        href: '"#dataview/" + matchClass.ref.workspaceId + "/" + matchClass.ref.objectId + "/" + matchClass.ref.version',
                    },
                    text: 'title'
                },
                target: '_blank'
            }),
            '<!-- /ko -->',
            '<!-- ko ifnot: matchClass.viewable -->',
            div({
                dataBind: {
                    text: 'title'
                }
            }),
            '<!-- /ko -->',
            '<!-- /ko -->',

            '<!-- /ko -->'
        ];
    }

    function buildMatchViewObject() {
        return div({
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'row',
                // border: '1px solid green'
            }
        }, [
            div({
                style: {
                    flex: '1',
                    // border: '1px dashed silver'
                }
            }, buildObjectCheckbox()),
            div({
                style: {
                    flex: '1',
                    // border: '1px dashed silver'
                },
                dataBind: {
                    text: 'type.label'
                }
            }),
            div({
                style: {
                    flex: '3',
                    // border: '1px dashed silver'
                }
            }, buildObjectLink()),
            div({
                style: {
                    flex: '1',
                    // border: '1px dashed silver'
                }
            }, ''),
            div({
                style: {
                    flex: '1.5',
                    // border: '1px dashed silver'
                },
                dataBind: {
                    typedText: {
                        type: '"date"',
                        format: '"MM/DD/YYYY"',
                        value: 'date'
                    }
                }
            }),
            div({
                style: {
                    flex: '1',
                    // border: '1x silver dashed'
                }
            }, buildObjectButton()),
        ]);
    }

    function buildMatchHighlightsTable() {
        return table({
            class: 'results-table',
        }, tbody({
            dataBind: {
                foreach: 'matches'
            }
        }, tr([
            td({
                style: {
                    // fontStyle: 'italic',
                    width: '30%'
                },
                dataBind: {
                    text: 'label'
                }
            }),
            td({
            },[
                '<!-- ko foreach: $data.highlights -->',
                span({
                    dataBind: {
                        text: 'before'
                    }
                }), ' ',
                span({
                    dataBind: {
                        text: 'match'
                    },
                    class: 'highlight'
                }), ' ', 
                span({
                    dataBind: {
                        text: 'after'
                    }
                }),
                '<!-- /ko -->',
            ])
        ])));
    }

    function buildMatchViewMatches() {
        return div({
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'row',
                // border: '1px solid green',
                marginBottom: '10px'
            }
        }, [
            div({
                style: {
                    flex: '1',
                    // border: '1px dashed silver'
                }
            }, ''),
            div({
                style: {
                    flex: '1',
                    // border: '1px dashed silver'
                }
            }),
            div({
                style: {
                    flex: '4.5',
                    // border: '1px dashed silver'
                }
            }, div({
                
            }, [
                buildMatchHighlightsTable()
            ])),
            div({
                style: {
                    flex: '1',
                    // border: '1px dashed silver'
                }
            }, ''),
            div({
                style: {
                    flex: '1',
                    // border: '1x silver dashed'
                }
            }),
        ]);
    }

    function buildMatchViewDetailTable() {
        return table({
            class: 'results-table',
        }, tbody({
            dataBind: {
                foreach: 'detail'
            }
        }, tr([
            td({
                style: {
                    width: '30%'
                },
                dataBind: {
                    text: 'label'
                }
            }),
            '<!-- ko if: $data.highlights -->',
           
            td({
                style: {
                    width: '70%'
                }        
            }, [
                '<!-- ko foreach: $data.highlights -->',
                span({
                    dataBind: {
                        text: 'before'
                    }
                }), ' ',
                span({
                    dataBind: {
                        text: 'match'
                    },
                    class: 'highlight'
                }), ' ', 
                span({
                    dataBind: {
                        text: 'after'
                    }
                }),
                '<!-- /ko -->',
            ]),
            
            '<!-- /ko -->',
            '<!-- ko ifnot: $data.highlights -->',
            td({
                style: {
                    width: '70%'
                },
                dataBind: {
                    text: 'value'
                }
            }),
            '<!-- /ko -->'
        ])));
    }

    function buildMatchViewDetail() {
        return div({
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'row',
                // border: '1px solid green',
                marginBottom: '10px'
            }
        }, [
            div({
                style: {
                    flex: '1',
                    // border: '1px dashed silver'
                }
            }, ''),
            div({
                style: {
                    flex: '1',
                    // border: '1px dashed silver'
                }
            }),
            div({
                style: {
                    flex: '4.5',
                    // border: '1px dashed silver'
                }
            }, div({
                
            }, [
                buildMatchViewDetailTable()
            ])),
            div({
                style: {
                    flex: '1',
                    // border: '1px dashed silver'
                }
            }, ''),
            div({
                style: {
                    flex: '1',
                    // border: '1x silver dashed'
                }
            }),
        ]);
    }

    // function buildMatchesView() {
    //     return div({}, [
            
    //         buildMatchViewMatches(),
    //         '<!-- ko if: $component.view().detail -->',
    //         '<!-- ko if: $data.detail -->',
    //         buildMatchViewDetail(),
    //         '<!-- /ko -->',
    //         '<!-- /ko -->',
    //         '<!-- /ko -->'
    //     ]);
    // }

    // function buildDetailView() {
    //     return div({}, [
    //         '<!-- ko if: $data.detail -->',
    //         buildMatchViewDetail(),
    //         '<!-- /ko -->'
    //     ]);
    // }

    function buildMatchDetailHeader() {
        return div({
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'row',
                borderBottom: '1px silver solid',
                marginBottom: '10px'
            }
        }, [
            div({
                style: {
                    flex: '1',
                    // border: '1px dashed silver'
                }
            }, ''),
            div({
                style: {
                    flex: '1',
                    // border: '1px dashed silver'
                }
            }, 'Type'),
            div({
                style: {
                    flex: '3',
                    // border: '1px dashed silver'
                }
            }, [
                'Name'
            ]),
            div({
                style: {
                    flex: '1',
                    // border: '1px dashed silver'
                }
            }),
            div({
                style: {
                    flex: '1.5',
                    // border: '1px dashed silver'
                }
            }, [
                'Created / Modified'
            ]),
            div({
                style: {
                    flex: '1',
                    // border: '1x silver dashed'
                }
            }, ''),
        ]);
    }

    function buildViewRow() {
        return div({
            style: {
                // marginTop: '5px',
                marginBottom: '15px'
            }
        }, [
            '<!-- ko if: $component.view().summary -->',
            buildSummaryView(),
            '<!-- /ko -->',

            '<!-- ko if: $component.view().matches || $component.view().detail  -->',
            buildSummaryView(),

            buildMatchDetailHeader(),

            '<!-- ko foreach: objects -->',

            buildMatchViewObject(),

            '<!-- ko if: $component.view().matches -->',
            buildMatchViewMatches(),
            '<!-- /ko -->',

            '<!-- ko if: $component.view().detail && $data.detail-->',
            buildMatchViewDetail(),
            '<!-- /ko -->',

            '<!-- /ko -->',

            '<!-- /ko -->'
        ]);
    }

    function buildRow() {
        return div([
            buildNarrativeRow(),
            buildViewRow()
        ]);
    }

    function buildResults() {
        return div({
            dataBind: {
                foreach: 'searchState.buffer',
            },
            name: 'result-rows',
            // style: {
            //     border: '1px green dashed'
            // }
        }, [
            buildRow()
        ]);
    }

    function buildResultsSlider() {
        return div({
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
                // position: 'relative'
            }
        }, [
            // a stack... simple at first
            // results before display
            // results of display
            // results after display
            // truncation indicator (not to scale!)

            // Search results space before current results
            div({
                style: {
                    flexShrink: '1',
                    flexBasis: '0px',
                    backgroundColor: 'silver'
                },
                dataBind: {
                    style: {
                        'flex-grow': '$component.scroller.map.before'
                    }
                }
            }),

            // search results  buffer.
            div({
                style: {
                    flexShrink: '1',
                    flexBasis: '0px',
                    backgroundColor: 'red'
                },
                dataBind: {
                    style: {
                        'flex-grow': '$component.scroller.map.current'
                    }
                }
            }),

            // search results space after buffer
            div({
                style: {
                    flexShrink: '1',
                    flexBasis: '0px',
                    backgroundColor: 'silver'
                },
                dataBind: {
                    style: {
                        'flex-grow': '$component.scroller.map.after'
                    }
                }
            }),

            // Show if overflowing
            div({
                style: {
                    backgroundColor: 'red',
                    flex: '0 0 20px',
                    textAlign: 'center',
                    color: 'white'
                    // position: 'absolute',
                    // left: '0'
                },
                // dataBind: {
                //     style: {
                //         height: '$component.scroller.height',
                //         top: '$component.scroller.top'
                //     }
                // }
            }, span({
                class: 'fa fa-ban'                
            }))
        ]);
    }

    function buildBufferSlider() {
        return div({
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
                // position: 'relative'
            }
        }, [
            // a stack... simple at first
            // results before display
            // results of display
            // results after display
            // truncation indicator (not to scale!)

            // Search results space before buffer
            div({
                style: {
                    flexShrink: '1',
                    flexBasis: '0px',
                    backgroundColor: 'silver'
                },
                dataBind: {
                    style: {
                        'flex-grow': '$component.scroller.buffer.before'
                    }
                }
            }),

            // search results space buffer.
            div({
                style: {
                    flexShrink: '1',
                    flexBasis: '0px',
                    backgroundColor: 'blue'
                },
                dataBind: {
                    style: {
                        'flex-grow': '$component.scroller.buffer.current'
                    }
                }
            }),

            // search results space after buffer
            div({
                style: {
                    flexShrink: '1',
                    flexBasis: '0px',
                    backgroundColor: 'silver'
                },
                dataBind: {
                    style: {
                        'flex-grow': '$component.scroller.buffer.after'
                    }
                }
            })
        ]);
    }

    function buildResultsSliderButtons() {
        return [div({
            class: styles.classes.scrollButton,
            dataBind: {
                click: 'doPreviousPage',
                event: {
                    
                    // mousedown: 'doScrollDownMouseDown',
                    // mouseup: 'doScrollDownMouseUp'
                }
            }
        }, span({
            class: 'fa fa-chevron-up'
        })),
        div({
            class: styles.classes.scrollButton,
            dataBind: {
                click: 'doNextPage',
                event: {
                    // mousedown: 'doScrollUpMouseDown',
                    // mouseup: 'doScrollUpMouseUp'
                }
            }
        }, span({
            class: 'fa fa-chevron-down'
        }))];
    }

    function buildBufferSliderButtons() {
        return [div({
            class: styles.classes.scrollButton,
            dataBind: {
                event: {
                    mousedown: 'doScrollDownMouseDown',
                    mouseup: 'doScrollDownMouseUp'
                }
            }
        }, span({
            class: 'fa fa-arrow-up'
        })),
        div({
            class: styles.classes.scrollButton,
            dataBind: {
                event: {
                    mousedown: 'doScrollUpMouseDown',
                    mouseup: 'doScrollUpMouseUp'
                }
            }
        }, span({
            class: 'fa fa-arrow-down'
        }))];
    }

    function buildSlider() {
        return [
            div({
                style: {
                    flex: '0 0 50px',
                    display: 'flex',
                    flexDirection: 'row'
                }
            }, [
                div({
                    style: {
                        flex: '1 1 0px',
                        display: 'flex',
                        flexDirection: 'column'
                    }
                }, buildBufferSliderButtons()),
                div({
                    style: {
                        flex: '1 1 0px',
                        display: 'flex',
                        flexDirection: 'column'
                    }
                }, buildResultsSliderButtons())
            ]),

            div({
                style: {
                    flex: '1 1 0px',
                    display: 'flex',
                    flexDirection: 'row'
                }
            }, [
                div({
                    style: {
                        flex: '1 1 0px',
                        display: 'flex',
                        flexDirection: 'column'
                    }
                }, buildBufferSlider()),
                div({
                    style: {
                        flex: '1 1 0px',
                        display: 'flex',
                        flexDirection: 'column'
                    }
                }, buildResultsSlider())
            ])
        ];
    }

    function template() {
        return div({
            style: {
                flex: '1 1 0px',
                
                // border: '1px dotted orange',
                display: 'flex',
                flexDirection: 'row'
            }
        }, [
            styles.sheet,
            
            div({
                style: {
                    flex: '1 1 0px',
                    overflowY: 'hidden',
                },
                name: 'result-rows-container'
            }, buildResults()),
            div({
                style: {
                    flex: '0 0 25px',
                    display: 'flex',
                    flexDirection: 'column'
                }
            }, buildSlider())
        ]);
    }

    function component() {
        return {
            viewModel: {
                createViewModel: viewModel
            },
            template: template()
        };
    }

    return ko.kb.registerComponent(component);
});