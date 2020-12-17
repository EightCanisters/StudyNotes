修改placeholder的颜色:

    input.tag-picker-input {
        &::placeholder {color: #eeeeee}; //支持Chrome和Firefox使用, edge和ie不适用
        &::-moz-placeholder { color: $mobile-black-5; } // 只对firefox生效
        &:-moz-placeholder { color: $mobile-black-5; }
        &::-webkit-input-placeholder { color:$mobile-black-5; } // 对chrome和edge生效，firefox不生效
        &:-ms-input-placeholder { color:$mobile-black-5; }
    }
