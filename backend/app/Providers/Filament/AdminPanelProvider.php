<?php

namespace App\Providers\Filament;

use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages\Dashboard;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets\AccountWidget;
use Filament\Widgets\FilamentInfoWidget;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->brandName('Plaza Kebun Sayur - Panel Pengelola')
            ->font('DM Sans')
            ->colors([
                'primary' => Color::hex('#8B1A1A'),
            ])
            ->renderHook(
                \Filament\View\PanelsRenderHook::HEAD_END,
                fn (): string => $this->getPanelStyles()
            )
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\Filament\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\Filament\Pages')
            ->pages([
                Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\Filament\Widgets')
            ->widgets([
                \App\Filament\Widgets\StatsOverviewWidget::class,
                \App\Filament\Widgets\QuickActionsWidget::class,
                \App\Filament\Widgets\RecentContactMessagesWidget::class,
            ])
            ->middleware($this->getPanelMiddleware())
            ->authMiddleware([
                Authenticate::class,
            ]);
    }

    protected function getPanelStyles(): string
    {
        return \Illuminate\Support\Facades\Blade::render(<<<'HTML'
            <style>
                :root {
                    --theme-font: 'DM Sans', sans-serif;
                    --theme-radius-md: 7px;
                    --theme-shadow-md: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
                }
                body, .fi-body {
                    font-family: 'DM Sans', sans-serif !important;
                }
                .fi-btn, .fi-badge, .fi-input-wrp, .fi-ta-ctn, .fi-section, .fi-card, .fi-modal-window, .fi-sidebar-item, .fi-tabs-item {
                    border-radius: 7px !important;
                }
                .fi-section, .fi-card, .fi-ta-ctn, .fi-modal-window {
                    box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px !important;
                }
                .indicator-dot {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    flex-shrink: 0;
                }
                .indicator-dot-success { background-color: #10b981; }
                .indicator-dot-danger { background-color: #ef4444; }
                .indicator-dot-warning { background-color: #f59e0b; }
                .indicator-dot-info { background-color: #0284c7; }
            </style>
        HTML);
    }

    /**
     * @return array<int, class-string>
     */
    protected function getPanelMiddleware(): array
    {
        return [
            EncryptCookies::class,
            AddQueuedCookiesToResponse::class,
            StartSession::class,
            AuthenticateSession::class,
            ShareErrorsFromSession::class,
            PreventRequestForgery::class,
            SubstituteBindings::class,
            DisableBladeIconComponents::class,
            DispatchServingFilamentEvent::class,
        ];
    }
}
