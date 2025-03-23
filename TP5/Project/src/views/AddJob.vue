<template>
    <div class="bg-gray-900 text-gray-100 py-8 rounded-xl shadow-xl max-w-2xl mx-auto mt-8">
        <h1 class="text-2xl font-semibold mb-6 text-blue-400 text-center">Add New Job</h1>
        <form @submit.prevent="handleSubmit" class="space-y-6 px-4">
            <!-- Form Fields -->
            <div class="space-y-2">
                <label for="title" class="block text-gray-300 text-sm font-bold">Title:</label>
                <input type="text" 
                       id="title"
                       v-model="title"
                       class="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-gray-300 placeholder-gray-400 transition-all"
                       placeholder="Enter title">
            </div>

            <div class="space-y-2">
                <label for="description" class="block text-gray-300 text-sm font-bold">Description:</label>
                <textarea id="description" 
                          v-model="description"
                          class="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-gray-300 placeholder-gray-400 transition-all"
                          placeholder="Enter description"
                          rows="4"></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                    <label for="salary" class="block text-gray-300 text-sm font-bold">Salary:</label>
                    <input type="number" 
                           id="salary"
                           v-model="salary"
                           class="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-gray-300 placeholder-gray-400 transition-all"
                           placeholder="Enter salary">
                </div>

                <div class="space-y-2">
                    <label for="experience" class="block text-gray-300 text-sm font-bold">Years of Experience:</label>
                    <input type="number" 
                           id="experience"
                           v-model="experience"
                           class="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-gray-300 placeholder-gray-400 transition-all"
                           placeholder="Enter years of experience">
                </div>
            </div>

            <div class="flex justify-center">
                <button
                    type="submit"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                >
                    Add Job
                </button>
            </div>
        </form>
    </div>
</template>



<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const title = ref('');
    const description = ref('');
    const salary = ref('');
    const experience = ref('');
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            const newJob = {
                title: title.value,
                description: description.value,
                salary: salary.value,
                experience: experience.value,
                createdAt: new Date().toISOString()
            };

            const response = await fetch('http://localhost:3000/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newJob)
            });

            if (response.ok) {
                router.push('/'); // Redirect to home after successful submission
            } else {
                console.error('Failed to add job:', response.status);
            }
        } catch (error) {
            console.error('Error adding job:', error);
        }
    };
</script>
