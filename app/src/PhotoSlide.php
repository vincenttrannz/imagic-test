<?php

namespace {
    use SilverStripe\ORM\DataObject;
    use SilverStripe\Forms\FieldGroup;
    use SilverStripe\AssetAdmin\Forms\UploadField;
    use SilverStripe\Assets\Image;

    class PhotoSlide extends DataObject
    {
        private static $has_one = [
            "HomePage" => HomePage::class,
            'Photo' => Image::class,
        ];

        private static $owns = [
            'Photo'
        ];

        private static $summary_fields = [
            'Photo.CMSThumbnail' => 'Photo'
         ];

        /**
         * CMS Fields
         * @return FieldList
         */
        public function getCMSFields()
        {
            $fields = parent::getCMSFields();

            $fields->addFieldToTab("Root.Main", UploadField::create('Photo', 'Photo'));

            return $fields;
        }
    }
}
