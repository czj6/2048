var nums = new Array();
var score = 0;

function init() {
    for (let i = 0; i < 4; i++) {
        nums[i] = new Array();
        for (let j = 0; j < 4; j++) {
            nums[i][j] = 0
            $("#num" + i + j).css("background", getColor(nums[i][j]))
            $(".item" + i + j).css({
                "position": "absolute",
                "top": 0.025 + i * 1.3 + "rem",
                "left": 0.025 + j * 1.3 + "rem",
                "width": 1.25 + "rem",
                "height": 1.25 + "rem",

            })

        }
    }
    console.log(nums)
    updateData()
    randNum();
    randNum();
    updateData()
    updateScore(score)
}

function updateData() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (nums[i][j] !== 0) {
                $("#num" + i + j).html(nums[i][j])
            } else {
                $("#num" + i + j).html("")
            }
        }
    }

}

function randNum() {

    while (true) {
        var x = parseInt(Math.floor(Math.random() * 4));
        var y = parseInt(Math.floor(Math.random() * 4));

        if (nums[x][y] == 0) {
            break;
        }
    }
    nums[x][y] = Math.random() <= 0.5 ? 2 : 4;
    $("#num" + x + y).css("background", getColor(nums[x][y]))
    showAnimal(x, y)
}

function getColor(key) {
    switch (key) {
        case 0:
            return '#BDB76B';
            break;
        case 2:
            return '#F5DEB3';
            break;
        case 4:
            return '#EEE8AA';
            break;
        case 8:
            return '#F4A460';
            break;
        case 16:
            return '#FFA500';
            break;
        case 32:
            return '#FF6347';
            break;
        case 64:
            return '#FF4500';
            break;
        case 128:
            return '#CD5C5C';
            break;
        case 256:
            return '#BC8F8F';
            break;
        case 512:
            return '#B22222';
            break;
        case 1024:
            return '#8B0000';
            break;
        case 2048:
            return '#FF0000';
            break;
        case 4096:
            return '#800000';
            break;
    }
    // 默认 #D2B48C
    // 2   #BDB76B
    // 4   	#EEE8AA
}

function moveLeft() {
    let flag = false; //用来判断是否移动成功
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            // 挨个判断需不需要移动，当然最左不用动，为0的话直接跳过
            if (nums[i][j] == 0) {
                continue;
            }
            for (var k = j - 1; k > 0; k--) {
                if (nums[i][k] == 0) {
                    continue;
                } else {
                    break;
                }
            }
            if (nums[i][j] === nums[i][k]) {
                nums[i][k] += nums[i][j];
                score += nums[i][k];
                nums[i][j] = 0;
                animateMove(i, j, i, k);
                flag = true

            } else if (k === 0 && nums[i][k] == 0) {
                nums[i][k] = nums[i][j];
                nums[i][j] = 0;
                animateMove(i, j, i, k);
                flag = true
            } else {
                if (k + 1 == j) {
                    continue;
                }
                nums[i][k + 1] = nums[i][j];
                nums[i][j] = 0;
                animateMove(i, j, i, k + 1);
                flag = true
            }
        }
    }
    updateData()
    updateScore(score)
    if (isOver()) {
        alert("gameover,请重新开始游戏")
        return;
    }
    if (flag) {
        randNum()
        updateData()
    }

}

function moveRight() {
    let flag = false
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            // 挨个判断需不需要移动，当然最左不用动，为0的话直接跳过
            if (nums[i][j] == 0) {
                continue;
            }
            for (var k = j + 1; k < 3; k++) {
                if (nums[i][k] == 0) {
                    continue;
                } else {
                    break;
                }
            }
            if (nums[i][j] === nums[i][k]) {
                nums[i][k] += nums[i][j];
                score += nums[i][k];
                nums[i][j] = 0;
                animateMove(i, j, i, k);
                flag = true

            } else if (k === 3 && nums[i][k] == 0) {
                nums[i][k] = nums[i][j];
                nums[i][j] = 0;
                animateMove(i, j, i, k);
                flag = true

            } else {
                if (k - 1 == j) {
                    continue;
                }
                nums[i][k - 1] = nums[i][j];
                nums[i][j] = 0;
                animateMove(i, j, i, k - 1);
                flag = true
            }
        }
    }
    updateData()
    updateScore(score)
    if (isOver()) {
        alert("gameover,请重新开始游戏")
        return;
    }
    if (flag) {
        randNum()
        updateData()
    }
}

function moveTop() {
    let flag = false
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            // 挨个判断需不需要移动，当然最左不用动，为0的话直接跳过
            if (nums[j][i] == 0) {
                continue;
            }
            for (var k = j - 1; k > 0; k--) {
                if (nums[k][i] == 0) {
                    continue;
                } else {
                    break;
                }
            }
            if (nums[j][i] === nums[k][i]) {
                nums[k][i] += nums[j][i];
                score += nums[i][k];
                nums[j][i] = 0;
                animateMove(j, i, k, i);
                flag = true

            } else if (k === 0 && nums[k][i] == 0) {
                nums[k][i] = nums[j][i];
                nums[j][i] = 0;
                animateMove(j, i, k, i);
                flag = true

            } else {
                if (k + 1 == j) {
                    continue;
                }
                nums[k + 1][i] = nums[j][i];
                nums[j][i] = 0;
                animateMove(j, i, k + 1, i);
                flag = true
            }
        }
    }
    updateData()
    updateScore(score)
    if (isOver()) {
        alert("gameover,请重新开始游戏")
        return;
    }
    if (flag) {
        randNum()
        updateData()
    }
}

function moveDown() {
    let flag = false
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            // 挨个判断需不需要移动，当然最左不用动，为0的话直接跳过
            if (nums[j][i] == 0) {
                continue;
            }
            for (var k = j + 1; k < 3; k++) {
                if (nums[k][i] == 0) {
                    continue;
                } else {
                    break;
                }
            }
            if (nums[j][i] === nums[k][i]) {
                nums[k][i] += nums[j][i];
                score += nums[i][k];
                nums[j][i] = 0;
                animateMove(j, i, k, i);
                flag = true

            } else if (k === 3 && nums[k][i] == 0) {
                nums[k][i] = nums[j][i];
                nums[j][i] = 0;
                animateMove(j, i, k, i);
                flag = true

            } else {
                if (k - 1 == j) {
                    continue;
                }
                nums[k - 1][i] = nums[j][i];
                nums[j][i] = 0;
                animateMove(j, i, k - 1, i);
                flag = true
            }
        }
    }

    updateData()
    updateScore(score)
    if (isOver()) {
        alert("gameover,请重新开始游戏")
        return;
    }
    if (flag) {
        randNum()
        updateData()
    }
}

function keyEvent() {
    $(window).on("keydown", function(ev) {
        if (ev.keyCode == 37) {
            moveLeft()
            return false
        }
        if (ev.keyCode == 39) {
            moveRight()
            return false
        }
        if (ev.keyCode == 38) {
            moveTop()
            return false
        }
        if (ev.keyCode == 40) {
            moveDown()
            return false
        }
    })
}

function animateMove(i, j, x, y) {
    $(".item" + i + j).animate({
            "left": 0.025 + y * 1.3 + "rem",
            "top": 0.025 + x * 1.3 + "rem",
        }, 150, "linear", function() {
            $(".item" + i + j).css({
                "top": 0.025 + i * 1.3 + "rem",
                "left": 0.025 + j * 1.3 + "rem",
            })
            $("#num" + i + j).css("background", getColor(nums[i][j]))
            $("#num" + x + y).css("background", getColor(nums[x][y]))
        })
        // 在回调函数里面设置最后样式
}

function isOver() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (nums[i][j] == 0) {
                return false
            }
        }
    }
    for (let i = 1; i < 3; i++) {
        for (let j = 1; j < 3; j++) {
            if (nums[i][j] === nums[i - 1][j] || nums[i][j] === nums[i + 1][j] || nums[i][j] === nums[i][j + 1] || nums[i][j] === nums[i][j - 1]) {
                return false
            }
        }
    }
    for (let j = 1; j < 3; j++) {
        if (nums[0][j] === nums[0][j - 1] || nums[0][j] === nums[0][j + 1] || nums[0][j] === nums[1][j]) {
            return false
        }
        if (nums[j][0] === nums[j - 1][0] || nums[j][0] === nums[j + 1][0] || nums[j][0] === nums[j][1]) {
            return false
        }
        if (nums[j][3] === nums[j - 1][3] || nums[j][3] === nums[j + 1][3] || nums[j][3] === nums[j][2]) {
            return false
        }
        if (nums[3][j] === nums[3][j - 1] || nums[3][j] === nums[3][j + 1] || nums[3][j] === nums[2][j]) {
            return false
        }
    }
    return true
}

function updateScore(score) {
    $(".score").html(score).addClass("animate__animated animate__lightSpeedInRight")
    $(".score").on("animationend", () => {
        this.removeClass("animate__animated animate__lightSpeedInRight")
    })
}

function showAnimal(x, y) {
    $("#num" + x + y).addClass("animate__animated animate__bounceIn")
}
$(function() {
    init()
    $(".btn").on("click", init)
    keyEvent()

})