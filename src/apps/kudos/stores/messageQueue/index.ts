import { defineStore } from 'pinia';
import { createTimer } from 'animejs';

const useMessageQueueStore = defineStore('messageQueue', () => {
  const MESSAGE_SHOW_TIME = 8000; // 8 seconds

  const messages = ref<
    {
      id: string;
      message: string;
      type: 'info' | 'success' | 'error';
    }[]
  >([]);

  const currentMessageTimeLeft = ref<number>(MESSAGE_SHOW_TIME);

  const currentMessageTimeLeftPercent = computed(() => {
    if (currentMessageTimeLeft.value <= 0) {
      return 0;
    }
    return (currentMessageTimeLeft.value / MESSAGE_SHOW_TIME) * 100;
  });

  const currentMessage = computed(() => {
    if (messages.value.length > 0) {
      return messages.value[0];
    }
    return null;
  });

  const timer = createTimer({
    duration: MESSAGE_SHOW_TIME,
    autoplay: false,
    loop: false,
    onUpdate: anim => {
      currentMessageTimeLeft.value = Math.floor(MESSAGE_SHOW_TIME - anim.currentTime);

      if (currentMessageTimeLeft.value <= 0) {
        dismissCurrentMessage();
      }
    },
  });

  const addMessage = async (details: { message: string; type: 'info' | 'success' | 'error' }) => {
    messages.value.push({
      id: crypto.randomUUID(),
      message: details.message,
      type: details.type,
    });

    // If this is the first message, start the timer
    if (messages.value.length === 1) {
      timer.reset();

      await nextTick();

      timer.play();
    }
  };

  const dismissCurrentMessage = async () => {
    currentMessageTimeLeft.value = MESSAGE_SHOW_TIME;

    if (messages.value.length > 0) {
      messages.value.shift();

      if (messages.value.length > 0) {
        // Start the timer for the next message
        timer.reset();

        await nextTick();

        timer.play();
      }
    }
  };

  const pauseMessageCountdown = () => {
    if (currentMessageTimeLeft.value > 0) {
      timer.pause();
    }
  };

  const resumeMessageCountdown = () => {
    if (currentMessageTimeLeft.value > 0) {
      timer.resume();
    }
  };

  return {
    messages,
    currentMessage,
    addMessage,
    currentMessageTimeLeftPercent,
    dismissCurrentMessage,
    pauseMessageCountdown,
    resumeMessageCountdown,
  };
});

export default useMessageQueueStore;
