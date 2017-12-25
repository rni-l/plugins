<template>
  <transition name="modal-fade">
    <div
      v-show="show"
      tabindex="-1"
      :style="style"
      :class="['modal', className]"
      @keyup.esc="onEsc"
    >
      <div class="modal-mask" v-if="mask" @click="$emit('hide')" />
      <transition :name="`modal-${animation}`">
        <div class="modal-dialog" v-show="show" :style="dialogStyle">
          <span class="modal-close" v-if="closeButton" @click="$emit('hide')" />
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'modal',
    props: {
      show: {
        type: Boolean,
        required: true
      },
      duration: {
        type: Number,
        default: 300
      },
      measure: {
        type: String,
        default: 'px'
      },
      animation: {
        type: String,
        default: 'zoom'
      },
      mask: {
        type: Boolean,
        default: true
      },
      closeButton: {
        type: Boolean,
        default: true
      },
      className: {
        type: String,
        default: ''
      }
    },
    computed: {
      style() {
        return {
          animationDuration: `${this.duration}ms`,
          webkitAnimationDuration: `${this.duration}ms`
        }
      },
      dialogStyle() {
        return {
          ...this.style,
          width: `${this.width + this.measure}`,
          height: `${this.height + this.measure}`
        }
      }
    },
    methods: {
      onEsc() {
        if (this.show) {
          this.$emit('hide')
        }
      }
    },
    watch: {
      show(show) {
        if (show) {
          this.$nextTick(() => {
            this.$el.focus()
          })
        }
      }
    }
  }
</script>

<style lang="less">
  .modal,
  .modal-mask {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 11;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    position: fixed;
  }

  .modal-mask {
    position: absolute;
    background: rgba(0, 0, 0, .3);
  }

  .modal-dialog {
    position: relative;
    z-index: 101;
    padding: 15px;
    background: #fff;
    border-radius: 3px; /* no */
    box-shadow: 0 1px 3px rgba(0, 0, 0, .2); /* no */
    width: 80%;
    height: auto;
    max-height: 350px;
    overflow: hidden;
  }

  .modal-close {
    position: absolute;
    cursor: pointer;
    top: 16px;
    right: 16px;
    width: 16px;
    height: 16px;
  }

  .modal-close:before,
  .modal-close:after {
    position: absolute;
    content: '';
    height: 2px; /* no */
    width: 100%;
    top: 50%;
    left: 0;
    margin-top: -1px; /* no */
    background: #999;
    border-radius: 100%;
    -webkit-transition: background .2s;
    transition: background .2s;
  }

  .modal-close:before {
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .modal-close:after {
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .modal-close:hover:before,
  .modal-close:hover:after {
    background: #333;
  }

  /* -- fade -- */
  @-webkit-keyframes modal-fade-enter {
    from {
      opacity: 0;
    }
  }

  @keyframes modal-fade-enter {
    from {
      opacity: 0;
    }
  }

  .modal-fade-enter-active {
    -webkit-animation: modal-fade-enter both ease-in;
    animation: modal-fade-enter both ease-in;
  }

  @-webkit-keyframes modal-fade-leave {
    to {
      opacity: 0
    }
  }

  @keyframes modal-fade-leave {
    to {
      opacity: 0
    }
  }

  .modal-fade-leave-active {
    -webkit-animation: modal-fade-leave both ease-out;
    animation: modal-fade-leave both ease-out;
  }
</style>
