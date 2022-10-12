<template>
    <div>
        <base-dialog :show="!!error" :close="handleError" title="An error occcured">
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <base-card>
                <h2>Register as a coach now!</h2>
                <coach-form @save-data="saveData"></coach-form>
            </base-card>
        </section>
    </div>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue'
import BaseDialog from '../../components/ui/BaseDialog.vue';
export default {
    components: {
        CoachForm,
        BaseDialog
    },
    data() {
        return {
            error: null
        };
    },
    methods: {
        saveData(data) {
            try {

                this.$store.dispatch('coaches/registerCoach', data);
                this.$router.replace('/coaches');
            }
            catch (error) {
                this.error = error.message || 'Something went wrong!';
            }
        },
        handleError() {
            this.error = null;
        }
    }
}
</script>
