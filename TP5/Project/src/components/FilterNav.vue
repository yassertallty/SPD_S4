<template>
    <nav class="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row gap-4 py-4">
                <!-- Search Input -->
                <div class="flex-1 relative group">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </div>
                    <input type="text" 
                           class="w-full pl-10 pr-4 py-3 bg-gray-800 rounded-lg border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-gray-300 placeholder-gray-500 transition-all"
                           placeholder="Search jobs..."
                           v-model="searchQuery">
                </div>

                <!-- Filter Group -->
                <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div class="relative flex-1">
                        <select v-model="selectedCategory" 
                                class="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-gray-300 appearance-none transition-all">
                            <option value="">All Categories</option>
                            <option value="Software">Software Development</option>
                            <option value="Design">Design</option>
                            <option value="Marketing">Marketing</option>
                        </select>
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
                            </svg>
                        </div>
                    </div>

                    <div class="relative flex-1">
                        <select v-model="selectedLocation" 
                                class="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-gray-300 appearance-none transition-all">
                            <option value="">All Locations</option>
                            <option value="Remote">Remote</option>
                            <option value="NY">New York</option>
                            <option value="LA">Los Angeles</option>
                        </select>
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>


<script setup>
    import { ref, watch } from 'vue';

    const searchQuery = ref('');
    const selectedCategory = ref('');
    const selectedLocation = ref('');

    watch(searchQuery, (newQuery) => {
        console.log('Search query changed:', newQuery);
    
    });

    watch(selectedCategory, (newCategory) => {
        console.log('Category selected:', newCategory);
    });


    watch(selectedLocation, (newLocation) => {
        console.log('Location selected:', newLocation);
    });
</script>
