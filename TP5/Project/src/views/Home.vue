<template>
    <div class="bg-gray-900 text-gray-100 py-8 rounded-xl shadow-xl">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-semibold mb-6 text-blue-400 text-center">Available Jobs</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="job in jobs" :key="job.id" class="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div class="p-6">
                        <h2 class="text-xl font-semibold mb-2 text-blue-300">{{ job.title }}</h2>
                        <p class="text-gray-400 mb-4 line-clamp-2">{{ job.description }}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-500">Experience: {{ job.experience }}+ years</span>
                            <router-link :to="`/jobs/${job.id}`" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                                View Details
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
    import { ref, onMounted } from 'vue';
    import { RouterLink } from 'vue-router';

    const jobs = ref([]);

    onMounted(async () => {
        try {
            const response = await fetch('http://localhost:3000/jobs');
            jobs.value = await response.json();
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    });
</script>
