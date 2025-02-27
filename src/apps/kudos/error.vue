<script lang="ts" setup>
  const route = useRoute();
  const error = useError();
</script>

<template>
  <main class="error-page">
    <AppVersionHeader />
    <div class="error-page__content">
      <template v-if="error">
        <template v-if="error.statusCode !== 404">
          <div class="error-page__center-wrapper">
            <img src="/images/kudos-logo.svg" alt="Kudos" class="error-page__kudos-logo" />
            <h4 class="error-page__error-title">Fokkit 🙈</h4>
            <template v-if="error.message.includes('ECONNREFUSED') || error.message.includes('Network Error')">
              <div class="error-page__error-message">
                <p class="error-page__error-message-paragraph">
                  It looks like the Kudos API is down. This could be intentional. Or not.
                </p>
                <p class="error-page__error-message-paragraph">Go bother the manne in Dev Ops to find out which 😉</p>
              </div>
              <a :href="route.fullPath" class="try-again-button">Try Again</a>
            </template>
            <template v-else>
              <div class="error-page__blurb">
                <p class="error-page__blurb-paragraph">Sh*t, something went wrong 💀🙈</p>
              </div>
              <div class="error-page__error-message">
                <p>{{ error.message }}</p>
              </div>
            </template>
          </div>
        </template>
      </template>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  .error-page {
    display: grid;
    grid-template-rows: auto 1fr;

    &__content {
      padding: 1rem;

      display: grid;
    }

    &__center-wrapper {
      margin-top: 14vh;

      align-content: start;
      display: grid;
      gap: 1rem;
      justify-self: center;
    }

    &__kudos-logo {
      height: 7rem;
      margin-bottom: 1rem;
      max-width: 80vw;
      width: auto;

      justify-self: center;
    }

    &__error-title {
      color: var(--color-status-red-00);
    }

    &__blurb {
      padding: 1rem 0rem;

      display: grid;
      gap: 0.5rem;

      border-bottom: 1px solid var(--color-input-border-00);

      &-paragraph {
        color: var(--color-text-normal);
      }
    }

    &__error-message {
      padding: 0.5rem 1rem;

      background-color: var(--color-status-red-background-00);
      border: 1px solid var(--color-status-red-border-00);
      border-radius: 0.5rem;

      animation: fade-in-top 0.2s ease-in-out;

      &-paragraph {
        color: var(--color-status-red-type-00);

        line-height: 1.75rem;
      }

      @keyframes fade-in-top {
        0% {
          opacity: 0;
          transform: translateY(-0.5rem);
        }
        80% {
          opacity: 1;
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
  }

  .try-again-button {
    margin-top: 1rem;
    padding: 0.75rem 1.25rem;

    justify-self: center;

    background-color: var(--color-button-outline-background-00);
    border: 1px solid var(--color-button-outline-border-00);
    border-radius: 0.5rem;
    color: var(--color-text-bright);

    text-align: center;
    text-decoration: none;

    transition: background-color 0.2s;

    &:hover {
      background-color: var(--color-button-outline-background-01);
    }
  }
</style>
