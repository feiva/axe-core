describe('no-autoplay-audio', function() {
	'use strict';

	var check;
	var fixture = document.getElementById('fixture');
	var checkSetup = axe.testUtils.checkSetup;
	var checkContext = axe.testUtils.MockCheckContext();
	var preloadOptions = { preload: { assets: ['media'] } };

	before(function() {
		check = checks['no-autoplay-audio'];
	});

	afterEach(function() {
		fixture.innerHTML = '';
		axe._tree = undefined;
		checkContext.reset();
	});

	it('returns undefined when <audio> has no source (duration cannot be interpreted)', function(done) {
		var checkArgs = checkSetup('<audio id="target"></audio>');
		axe.utils.preload(preloadOptions).then(function() {
			assert.isUndefined(check.evaluate.apply(checkContext, checkArgs));
			done();
		});
	});

	it('returns undefined when <video> has no source (duration cannot be )', function(done) {
		var checkArgs = checkSetup('<video id="target"><source src=""/></video>');
		axe.utils.preload(preloadOptions).then(function() {
			assert.isUndefined(check.evaluate.apply(checkContext, checkArgs));
			done();
		});
	});

	it('returns false when <audio> can autoplay and has no controls mechanism', function(done) {
		var checkArgs = checkSetup(
			'<audio id="target" src="/test/assets/moon-speech.mp3" autoplay="true"></audio>'
		);
		axe.utils.preload(preloadOptions).then(function() {
			assert.isFalse(check.evaluate.apply(checkContext, checkArgs));
			done();
		});
	});

	it('returns false when <video> can autoplay and has no controls mechanism', function(done) {
		var checkArgs = checkSetup(
			'<video id="target" autoplay="true"><source src="/test/assets/video.mp4" type="video/mp4" /></video>'
		);
		axe.utils.preload(preloadOptions).then(function() {
			assert.isFalse(check.evaluate.apply(checkContext, checkArgs));
			done();
		});
	});

	it('returns true when <video> can autoplay and duration is below allowed duration', function(done) {
		var checkArgs = checkSetup(
			'<video id="target" autoplay="true">' +
				'<source src="/test/assets/video.mp4" type="video/mp4" />' +
				'</video>',
			{ allowedDuration: 15 }
		);
		axe.utils.preload(preloadOptions).then(function() {
			assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
			done();
		});
	});

	it('returns true when <audio> can autoplay but has controls mechanism', function(done) {
		var checkArgs = checkSetup(
			'<audio id="target" src="/test/assets/moon-speech.mp3" autoplay="true" controls></audio>'
		);
		axe.utils.preload(preloadOptions).then(function() {
			assert.isTrue(check.evaluate.apply(checkContext, checkArgs));
			done();
		});
	});

	it('returns true when <video> can autoplay and has no controls mechanism', function(done) {
		var checkArgs = checkSetup(
			'<video id="target" autoplay="true" controls>' +
				'<source src="/test/assets/video.mp4" type="video/mp4" />' +
				'</video>'
		);
		axe.utils.preload(preloadOptions).then(function() {
			assert.isTrue(check.evaluate.apply(null, checkArgs));
			done();
		});
	});
});