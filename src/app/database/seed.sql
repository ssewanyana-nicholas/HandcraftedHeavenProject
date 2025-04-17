-- Start transaction
BEGIN;
-- Insert users
INSERT INTO public.users (name, email, password, role)
VALUES (
        'Admin User',
        'admin@example.com',
        --ID 1
        'hashedpassword1',
        'admin'
    ),
    (
        'Good Client',
        'goodclient@example.com',
        --ID 2
        'hashedpassword2',
        'client'
    ),
    (
        'Bad Client',
        'badclient@example.com',
        --ID 3
        'hashedpassword3',
        'client'
    ),
    (
        'Ceramics seller',
        'ceramicsseller@example.com',
        --ID 4
        'hashedpassword4',
        'seller'
    ),
    (
        'Fibers seller',
        'fibersseller@example.com',
        --ID 5
        'hashedpassword5',
        'seller'
    ),
    (
        'HomeGoods seller',
        'homegoodsseller@example.com',
        --ID 6
        'hashedpassword6',
        'seller'
    ),
    (
        'Jewelery seller',
        'jeweleryseller@example.com',
        --ID 7
        'hashedpassword7',
        'seller'
    );
-- Insert products
INSERT INTO public.products (
        name,
        description,
        price,
        image_url,
        category,
        user_id
    )
VALUES (
        'Angled Mug - Azure',
        'Blue color, comfortable',
        19.99,
        'images\products\ceramics\angled-mug-azure.webp',
        'ceramics',
        4
    ),
    (
        'Bud Vase',
        'Ideal for your flowers',
        29.99,
        'images\products\ceramics\bud-vase.webp',
        'ceramics',
        4
    ),
    (
        'Camp Mug',
        'White color with a tiny drawing',
        9.99,
        'images\products\ceramics\camp-mug.webp',
        'ceramics',
        4
    ),
    (
        'Cheeseboard',
        'You will enjoy cutting cheese in here',
        9.99,
        'images\products\ceramics\cheeseboard.webp',
        'ceramics',
        4
    ),
    (
        'Dessert Bowl',
        'Ideal for fruits or whatever you want to put in it',
        9.99,
        'images\products\ceramics\dessert-bowl.webp',
        'ceramics',
        4
    ),
    (
        'Medium Nesting Bowl',
        'Brown-dark color, medium deep',
        9.99,
        'images\products\ceramics\medium-nesting-bowl.webp',
        'ceramics',
        4
    ),
    (
        'Oval Bowl',
        'White color deeper than others but smaller in its diameter',
        9.99,
        'images\products\ceramics\oval-bowl.webp',
        'ceramics',
        4
    ),
    (
        'Ring Dishes',
        'Tiny and ideal for decoration',
        9.99,
        'images\products\ceramics\ring-dishes.webp',
        'ceramics',
        4
    ),
    (
        'Stripped Mug',
        'Stripped, as simple as that.',
        9.99,
        'images\products\ceramics\stripped-mug.webp',
        'ceramics',
        4
    ),
    (
        'Flour Sack Towel - Ferns',
        'Blue Ferns? Its perfect!',
        9.99,
        'images\products\fibers\flour-sack-towel-ferns.webp',
        'fibers',
        5
    ),
    (
        'Flour Sack Towel - Gingko Leaves',
        'How beautiful are Gingkos',
        9.99,
        'images\products\fibers\flour-sack-towel-ginkoLeaves.webp',
        'fibers',
        5
    ),
    (
        'Flour Sack Towel - Pomegranates',
        'Just some red Pomegranates',
        9.99,
        'images\products\fibers\flour-sack-towels-pomegranates.jpg',
        'fibers',
        5
    ),
    (
        'Recycled Cottom Blanket - Blue Geometric',
        'If you like geometric and blankets, this one is for you',
        9.99,
        'images\products\fibers\recycled-cotton-blanket-blueGeometric.webp',
        'fibers',
        5
    ),
    (
        'Recycled Cottom Blanket - Bright Stripe',
        'Stripes everywhere',
        9.99,
        'images\products\fibers\recycled-cotton-blanket-brightStripe.webp',
        'fibers',
        5
    ),
    (
        'Small Wall Hanging - 1',
        'Just a simple deco',
        9.99,
        'images\products\fibers\small-wall-hanging1.webp',
        'fibers',
        5
    ),
    (
        'Small Wall Hanging - 2',
        'Tiny and ideal for decoration',
        9.99,
        'images\products\fibers\small-wall-hanging2.webp',
        'fibers',
        5
    ),
    (
        'Small Wall Hanging - 3',
        'Another wall hanging, really cute',
        9.99,
        'images\products\fibers\small-wall-hanging3.webp',
        'fibers',
        5
    ),
    (
        'Candle - Fireside Embers',
        'Perfect candle for deco',
        9.99,
        'images\products\home-goods\candle-fireSideEmbers.webp',
        'home-goods',
        6
    ),
    (
        'Candle - Mediterranean Fig',
        'Ideal if you look for having a slight smell in your house',
        9.99,
        'images\products\home-goods\candle-mediterraneanFig.webp',
        'home-goods',
        6
    ),
    (
        'Handled - Cutting Board',
        'You know, for cutting and preparing foods',
        9.99,
        'images\products\home-goods\handled-cutting-board.webp',
        'home-goods',
        6
    ),
    (
        'Round - Cutting Board',
        'Another option for cutting boards',
        9.99,
        'images\products\home-goods\round-cutting-board.webp',
        'home-goods',
        6
    ),
    (
        'Spreader - Blackened',
        'Perfect solution for spreading whatever you need',
        9.99,
        'images\products\home-goods\spreader-blackened.webp',
        'home-goods',
        6
    ),
    (
        'Spreader',
        'More simple spreader, but it gets the job done.',
        9.99,
        'images\products\home-goods\spreader.webp',
        'home-goods',
        6
    ),
    (
        'Earring - Leaf',
        'Ideal gift for someone special',
        9.99,
        'images\products\jewelery\earring-leaf.webp',
        'jewelery',
        7
    ),
    (
        'Earring - Basic Shape',
        'Who would not love it?',
        9.99,
        'images\products\jewelery\earrings-basicShape.webp',
        'jewelery',
        7
    ),
    (
        'Necklace - Amulet',
        'If you belive in protection or good fortune, this is for you!',
        9.99,
        'images\products\jewelery\necklace-amulet.webp',
        'jewelery',
        7
    ),
    (
        'Necklace - Black Porcelain',
        'Ideal if you like black porcelain',
        9.99,
        'images\products\jewelery\necklace-blackPorcelain.webp',
        'jewelery',
        7
    ),
    (
        'Necklace',
        'Just a more simple necklace, but still beautiful',
        9.99,
        'images\products\jewelery\necklace.webp',
        'jewelery',
        7
    );
-- Insert reviews (assuming client user ID is 2)
INSERT INTO public.reviews (user_id, product_id, description)
VALUES (2, 1, 'Great product! Really enjoyed it.'),
    (3, 2, 'Not bad, but could be improved.'),
    (2, 3, 'Excellent quality, highly recommend!'),
    (3, 11, 'Terrible product, not recomended'),
    (3, 7, 'Quality is meh, nothing great'),
    (2, 6, 'Is just perfect!'),
    (2, 12, 'Love it!');
-- Insert orders (assuming client user ID is 2)
INSERT INTO public.orders (user_id, product_id, quantity, date)
VALUES (2, 1, 1, NOW()),
    (2, 2, 3, NOW()),
    (2, 3, 2, NOW());
-- Commit transaction
COMMIT;