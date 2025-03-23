<template>
    <div v-if="job" class="bg-gray-900 text-gray-100 p-8 rounded-xl shadow-xl max-w-2xl mx-auto mt-8">
        <div class="flex flex-col lg:flex-row gap-8">
            <div class="flex-1">
                <h1 class="text-3xl font-semibold mb-6 text-blue-400">{{ job.title }}</h1>
                <div class="mb-6">
                    <h2 class="text-xl font-semibold text-gray-300 mb-2">Description</h2>
                    <p class="text-gray-400 leading-relaxed">{{ job.description }}</p>
                </div>
            </div>

            <div class="flex-1 space-y-6">
                <div class="bg-gray-800 p-6 rounded-lg">
                    <div class="flex items-center gap-4 mb-4 border-b border-gray-700">
                        <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.657 0 3 .895 3 2s-1.343 2-3 2-3 .895-3 2"/>
                        </svg>
                        <div>
                            <strong class="text-gray-300">Salary:</strong>
                            <span class="text-green-400 ml-2">${{ job.salary }}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-4 mb-4 border-b border-gray-700">
                        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H3v12h6V5z"/>
                        </svg>
                        <div>
                            <strong class="text-gray-300">Experience:</strong>
                            <span class="text-gray-400 ml-2">{{ job.experience }}+</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-4">
                        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m0 9h4m-4 4v-4"/>
                        </svg>
                        <div>
                            <strong class="text-gray-300">Posted:</strong>
                            <span class="text-gray-400 ml-2">{{ formatDate(job.createdAt) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-6 flex justify-end">
            <router-link :to="`/jobs/${job.id}/edit`" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                Edit Job
            </router-link>
        </div>
    </div>
    <div v-else class="text-center py-8">
        <p class="text-gray-500">Loading job details...</p>
    </div>
</template>


<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { RouterLink } from 'vue-router'; // Import RouterLink

    const route = useRoute();
    const jobId = route.params.id;
    const job = ref(null);

    onMounted(async () => {
        try {
            const response = await fetch(`http://localhost:3000/jobs/${jobId}`);
            if (response.ok) {
                job.value = await response.json();
            } else {
                console.error('Failed to fetch job:', response.status);
            }
        } catch (error) {
            console.error('Error fetching job:', error);
        }
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };
</script>
