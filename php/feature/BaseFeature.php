<?php
declare(strict_types=1);

// PhishIn SDK base feature

class PhishInBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(PhishInContext $ctx, array $options): void {}
    public function PostConstruct(PhishInContext $ctx): void {}
    public function PostConstructEntity(PhishInContext $ctx): void {}
    public function SetData(PhishInContext $ctx): void {}
    public function GetData(PhishInContext $ctx): void {}
    public function GetMatch(PhishInContext $ctx): void {}
    public function SetMatch(PhishInContext $ctx): void {}
    public function PrePoint(PhishInContext $ctx): void {}
    public function PreSpec(PhishInContext $ctx): void {}
    public function PreRequest(PhishInContext $ctx): void {}
    public function PreResponse(PhishInContext $ctx): void {}
    public function PreResult(PhishInContext $ctx): void {}
    public function PreDone(PhishInContext $ctx): void {}
    public function PreUnexpected(PhishInContext $ctx): void {}
}
