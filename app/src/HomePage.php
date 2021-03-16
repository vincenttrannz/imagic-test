<?php

namespace {

    use SilverStripe\Forms\TextField;
    use SilverStripe\Forms\HTMLEditor\HTMLEditorField;
    use SilverStripe\Forms\GridField\GridFieldConfig_RecordEditor;
    use SilverStripe\Forms\GridField\GridField;

    class HomePage extends Page
    {
        private static $db = [
            'Heading' => 'Text',
            'HeroText' => 'HTMLText'
        ];

        private static $has_many = [
            'PhotoSlides' => PhotoSlide::class
        ];

        private static $owns = [
            'PhotoSlides'
        ];

        /**
         * CMS Fields
         * @return FieldList
         */
        public function getCMSFields()
        {
            $fields = parent::getCMSFields();
            $fields->removeFieldFromTab("Root.Main", "Content");

            // Top Hero text
            $fields->addFieldToTab("Root.Main", TextField::create('Heading','Heading'));
            $fields->addFieldToTab("Root.Main", HTMLEditorField::create('HeroText', 'Hero text'));

            $standardsConf = GridFieldConfig_RecordEditor::create();
            $fields->addFieldToTab('Root.PhotoSlides', GridField::create(
                'PhotoSlides',
                'Each Photo',
                $this->PhotoSlides(),
                $standardsConf
            ));

            return $fields;
        }
    }
}
