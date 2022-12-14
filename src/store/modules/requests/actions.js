export default {
    async contactCoach(context, payload) {
        const coachId = payload.coachId;
        const newRequest = {
            userEmail: payload.email,
            message: payload.message
        };
        const response = await fetch(`https://vue-http-demo-e107b-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        });
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to send request.');
            throw error();
        }
        context.commit('addRequest', { ...newRequest, id: responseData.name, coachId });
    },
    async fetchRequests(context) {
        const coachId = context.rootGetters.userId;
        const response = await fetch(`https://vue-http-demo-e107b-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${coachId}.json`)

        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch requests.');
            throw error();
        }
        const requests = [];
        for (const key in responseData) {
            const request = {
                id: key,
                coachId,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message,
            }
            requests.push(request);
        }
        context.commit('setRequests', requests);
    }
}