<x-filament-widgets::widget>
    <x-filament::section>
        <x-slot name="heading">
            <div class="flex items-center gap-2">
                <span class="indicator-dot indicator-dot-info"></span>
                <span class="text-base font-semibold tracking-tight text-gray-950 dark:text-white">Aksi Cepat Halaman Website Publik</span>
            </div>
        </x-slot>

        <x-slot name="description">
            <span class="text-sm text-gray-500 dark:text-gray-400">Pintasan navigasi untuk mengelola konten admin atau langsung meninjau tampilan halaman di website publik.</span>
        </x-slot>

        <style>
            .pks-quick-grid {
                display: grid;
                grid-template-columns: repeat(1, minmax(0, 1fr));
                gap: 1rem;
                padding-top: 0.5rem;
            }
            @media (min-width: 640px) {
                .pks-quick-grid {
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                }
            }
            @media (min-width: 1024px) {
                .pks-quick-grid {
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                }
            }
            .pks-quick-card {
                padding: 1rem;
                border-radius: 7px;
                border: 1px solid rgba(229, 231, 235, 0.8);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                transition: all 0.18s ease-in-out;
                box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
            }
            .dark .pks-quick-card {
                border-color: rgba(31, 41, 55, 0.8);
            }
            .pks-quick-card:hover {
                border-color: rgba(139, 26, 26, 0.4);
                transform: translateY(-1px);
            }
            .pks-num-badge {
                width: 26px;
                height: 26px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                border-radius: 6px;
                font-weight: 700;
                font-size: 12px;
                flex-shrink: 0;
            }
            .pks-ext-btn {
                width: 32px;
                height: 32px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                border-radius: 7px;
                flex-shrink: 0;
                transition: background-color 0.15s ease;
            }
            .pks-ext-svg {
                width: 15px !important;
                height: 15px !important;
                max-width: 15px !important;
                max-height: 15px !important;
                min-width: 15px !important;
                min-height: 15px !important;
                flex-shrink: 0 !important;
                display: inline-block !important;
                vertical-align: middle;
            }
        </style>

        <div class="pks-quick-grid">
            @foreach ($quickLinks as $link)
                <div class="pks-quick-card bg-white dark:bg-gray-900">
                    <div>
                        <div class="flex items-center justify-between gap-2 mb-2">
                            <div class="flex items-center gap-2">
                                <span class="pks-num-badge bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                    {{ $link['number'] }}
                                </span>
                                <h3 class="text-sm font-semibold text-gray-900 dark:text-white tracking-tight">{{ $link['title'] }}</h3>
                            </div>
                            <span class="text-xs px-2 py-0.5 font-mono text-gray-500 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                                {{ $link['path'] }}
                            </span>
                        </div>
                        <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                            {{ $link['description'] }}
                        </p>
                    </div>

                    <div class="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                        <a href="{{ $link['admin_url'] }}" class="flex-1 inline-flex items-center justify-center px-3 py-1.5 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-500 active:bg-primary-700 rounded-[7px] transition-colors shadow-2xs">
                            Kelola Admin
                        </a>
                        <a href="{{ $link['public_url'] }}" target="_blank" rel="noopener noreferrer" class="pks-ext-btn text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-primary-600" title="Buka Halaman Web Publik">
                            <svg class="pks-ext-svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </a>
                    </div>
                </div>
            @endforeach
        </div>
    </x-filament::section>
</x-filament-widgets::widget>